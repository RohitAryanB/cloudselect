/**
 * All real interaction with AWS EC2 lives in this file.
 *
 * Safety rules baked in (important on a free-tier account):
 *  - Every instance this app launches is tagged ManagedBy=cloudselect.
 *  - Start/Stop/Terminate only ever operate on instances carrying that tag,
 *    so this dashboard can never touch other things in your AWS account.
 *  - Only free-tier-eligible instance types are allowed unless
 *    ALLOW_NON_FREE_TIER_LAUNCH=true is explicitly set in the environment.
 *  - A configurable cap (MAX_ACTIVE_INSTANCES, default 2) blocks launching
 *    more instances than you intend to pay for.
 */
const {
    DescribeInstancesCommand,
    DescribeImagesCommand,
    RunInstancesCommand,
    StartInstancesCommand,
    StopInstancesCommand,
    TerminateInstancesCommand,
} = require("@aws-sdk/client-ec2");
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const { getEc2Client, getSsmClient } = require("../config/aws");

const MANAGED_TAG_KEY = "ManagedBy";
const MANAGED_TAG_VALUE = "cloudselect";

const FREE_TIER_INSTANCE_TYPES = [
    { type: "t2.micro", vCpus: 1, memoryGiB: 1, freeTier: true },
    { type: "t3.micro", vCpus: 2, memoryGiB: 1, freeTier: true },
];

const EXTENDED_INSTANCE_TYPES = [
    ...FREE_TIER_INSTANCE_TYPES,
    { type: "t2.small", vCpus: 1, memoryGiB: 2, freeTier: false },
    { type: "t3.small", vCpus: 2, memoryGiB: 2, freeTier: false },
    { type: "t2.medium", vCpus: 2, memoryGiB: 4, freeTier: false },
];

const DEFAULT_ALLOWED_REGIONS = [
    { region: "us-east-1", label: "US East (N. Virginia)" },
    { region: "us-east-2", label: "US East (Ohio)" },
    { region: "us-west-2", label: "US West (Oregon)" },
    { region: "ap-south-1", label: "Asia Pacific (Mumbai)" },
    { region: "eu-west-1", label: "Europe (Ireland)" },
];

function getAllowedRegions() {
    if (process.env.AWS_ALLOWED_REGIONS) {
        const codes = process.env.AWS_ALLOWED_REGIONS.split(",").map(r => r.trim());
        return DEFAULT_ALLOWED_REGIONS.filter(r => codes.includes(r.region))
            .concat(codes
                .filter(c => !DEFAULT_ALLOWED_REGIONS.some(r => r.region === c))
                .map(c => ({ region: c, label: c })));
    }
    return DEFAULT_ALLOWED_REGIONS;
}

function assertRegionAllowed(region) {
    const allowed = getAllowedRegions().map(r => r.region);
    if (!allowed.includes(region)) {
        const err = new Error(`Region "${region}" is not in the allowed list: ${allowed.join(", ")}`);
        err.status = 400;
        throw err;
    }
}

function getInstanceTypeCatalog() {
    const allowNonFreeTier = process.env.ALLOW_NON_FREE_TIER_LAUNCH === "true";
    return allowNonFreeTier ? EXTENDED_INSTANCE_TYPES : FREE_TIER_INSTANCE_TYPES;
}

function assertInstanceTypeAllowed(instanceType) {
    const catalog = getInstanceTypeCatalog();
    if (!catalog.some(t => t.type === instanceType)) {
        const err = new Error(
            `Instance type "${instanceType}" is not allowed. Allowed types: ` +
            `${catalog.map(t => t.type).join(", ")}. ` +
            `(Set ALLOW_NON_FREE_TIER_LAUNCH=true on the server to unlock more types — this can incur cost.)`
        );
        err.status = 403;
        throw err;
    }
}

function tagValue(tags, key) {
    const tag = (tags || []).find(t => t.Key === key);
    return tag ? tag.Value : undefined;
}

function formatInstance(instance) {
    return {
        instanceId: instance.InstanceId,
        name: tagValue(instance.Tags, "Name") || "(unnamed)",
        instanceType: instance.InstanceType,
        state: instance.State?.Name,
        publicIp: instance.PublicIpAddress || null,
        privateIp: instance.PrivateIpAddress || null,
        launchTime: instance.LaunchTime,
        availabilityZone: instance.Placement?.AvailabilityZone,
        managedByCloudselect: tagValue(instance.Tags, MANAGED_TAG_KEY) === MANAGED_TAG_VALUE,
    };
}

/** List only the instances this app manages, in a given region. */
async function listInstances(region) {
    assertRegionAllowed(region);
    const client = getEc2Client(region);

    const result = await client.send(new DescribeInstancesCommand({
        Filters: [
            { Name: `tag:${MANAGED_TAG_KEY}`, Values: [MANAGED_TAG_VALUE] },
            { Name: "instance-state-name", Values: ["pending", "running", "stopping", "stopped"] },
        ],
    }));

    const instances = [];
    for (const reservation of result.Reservations || []) {
        for (const instance of reservation.Instances || []) {
            instances.push(formatInstance(instance));
        }
    }
    return instances;
}

async function countActiveInstances(region) {
    const client = getEc2Client(region);
    const result = await client.send(new DescribeInstancesCommand({
        Filters: [
            { Name: `tag:${MANAGED_TAG_KEY}`, Values: [MANAGED_TAG_VALUE] },
            { Name: "instance-state-name", Values: ["pending", "running", "stopping", "stopped"] },
        ],
    }));
    let count = 0;
    for (const reservation of result.Reservations || []) {
        count += (reservation.Instances || []).length;
    }
    return count;
}

/**
 * Get an Amazon Linux 2023 AMI id that is guaranteed to be flagged
 * Free-Tier-eligible, by reading it from AWS's own public SSM parameter
 * (the same source the EC2 Console's "Quick Start" launch wizard uses).
 * This avoids AWS's "specified instance type is not eligible for Free
 * Tier" error, which happens if you pick an AMI via a name-pattern
 * search that isn't on AWS's curated Free Tier AMI list.
 */
async function getLatestAmazonLinuxAmi(region) {
    const ssmParamName = "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64";

    try {
        const ssm = getSsmClient(region);
        const result = await ssm.send(new GetParameterCommand({ Name: ssmParamName }));
        if (result.Parameter?.Value) {
            console.log(`[awsEc2Service] AMI for ${region} resolved via SSM: ${result.Parameter.Value}`);
            return result.Parameter.Value;
        }
    } catch (ssmErr) {
        console.error(`[awsEc2Service] SSM AMI lookup failed for ${region}: ${ssmErr.name} - ${ssmErr.message}`);
        // Fall through to the DescribeImages fallback below.
    }

    // Fallback: search for the newest Amazon-owned AL2023 image directly.
    const client = getEc2Client(region);
    const result = await client.send(new DescribeImagesCommand({
        Owners: ["amazon"],
        Filters: [
            { Name: "name", Values: ["al2023-ami-2*-kernel-default-x86_64"] },
            { Name: "state", Values: ["available"] },
        ],
    }));

    const images = (result.Images || []).sort(
        (a, b) => new Date(b.CreationDate) - new Date(a.CreationDate)
    );

    if (!images.length) {
        const err = new Error(`Could not find an Amazon Linux 2023 AMI in ${region}.`);
        err.status = 502;
        throw err;
    }

    console.log(`[awsEc2Service] AMI for ${region} resolved via DescribeImages fallback: ${images[0].ImageId} (${images[0].Name})`);
    return images[0].ImageId;
}

/** Find a managed instance by id in a region, or throw a 404. */
async function getManagedInstanceOrThrow(region, instanceId) {
    const instances = await listInstances(region);
    const instance = instances.find(i => i.instanceId === instanceId);
    if (!instance) {
        const err = new Error(
            `Instance ${instanceId} was not found among instances managed by CloudSelect in ${region}. ` +
            `For safety, this dashboard only controls instances it launched itself.`
        );
        err.status = 404;
        throw err;
    }
    return instance;
}

async function launchInstance({ region, instanceType, name, keyName }) {
    assertRegionAllowed(region);
    assertInstanceTypeAllowed(instanceType);

    const maxActive = parseInt(process.env.MAX_ACTIVE_INSTANCES || "2", 10);
    const currentCount = await countActiveInstances(region);
    if (currentCount >= maxActive) {
        const err = new Error(
            `Refusing to launch: you already have ${currentCount} CloudSelect-managed instance(s) ` +
            `in ${region}, and the cap is ${maxActive} (set MAX_ACTIVE_INSTANCES to change this). ` +
            `This exists to protect your free-tier usage from runaway costs.`
        );
        err.status = 409;
        throw err;
    }

    const client = getEc2Client(region);
    const imageId = await getLatestAmazonLinuxAmi(region);
    console.log(`[awsEc2Service] Launching ${instanceType} in ${region} using AMI ${imageId}`);

    const params = {
        ImageId: imageId,
        InstanceType: instanceType,
        MinCount: 1,
        MaxCount: 1,
        TagSpecifications: [
            {
                ResourceType: "instance",
                Tags: [
                    { Key: "Name", Value: name || "cloudselect-instance" },
                    { Key: MANAGED_TAG_KEY, Value: MANAGED_TAG_VALUE },
                ],
            },
        ],
    };

    if (keyName) {
        params.KeyName = keyName;
    }

    let result;
    try {
        result = await client.send(new RunInstancesCommand(params));
    } catch (runErr) {
        console.error(`[awsEc2Service] RunInstances failed: ${runErr.name} - ${runErr.message}`);
        throw runErr;
    }
    return result.Instances.map(formatInstance);
}

async function startInstance(region, instanceId) {
    assertRegionAllowed(region);
    await getManagedInstanceOrThrow(region, instanceId);
    const client = getEc2Client(region);
    await client.send(new StartInstancesCommand({ InstanceIds: [instanceId] }));
    return { instanceId, action: "start", status: "requested" };
}

async function stopInstance(region, instanceId) {
    assertRegionAllowed(region);
    await getManagedInstanceOrThrow(region, instanceId);
    const client = getEc2Client(region);
    await client.send(new StopInstancesCommand({ InstanceIds: [instanceId] }));
    return { instanceId, action: "stop", status: "requested" };
}

async function terminateInstance(region, instanceId) {
    assertRegionAllowed(region);
    await getManagedInstanceOrThrow(region, instanceId);
    const client = getEc2Client(region);
    await client.send(new TerminateInstancesCommand({ InstanceIds: [instanceId] }));
    return { instanceId, action: "terminate", status: "requested" };
}

module.exports = {
    getAllowedRegions,
    getInstanceTypeCatalog,
    listInstances,
    launchInstance,
    startInstance,
    stopInstance,
    terminateInstance,
};
