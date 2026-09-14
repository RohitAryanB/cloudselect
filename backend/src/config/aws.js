/**
 * AWS EC2 client factory.
 *
 * Credentials are NEVER hardcoded here. They come from environment
 * variables, which in the Devtron/Kubernetes deployment are injected
 * from a Kubernetes Secret (see /deploy/k8s-aws-credentials-secret.example.yaml
 * and /deploy/DEVTRON_AWS_SETUP.md at the repo root).
 */
const { EC2Client } = require("@aws-sdk/client-ec2");
const { SSMClient } = require("@aws-sdk/client-ssm");

const clientsByRegion = {};
const ssmClientsByRegion = {};

function credentials() {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error(
            "AWS is not configured on the server. Set AWS_ACCESS_KEY_ID and " +
            "AWS_SECRET_ACCESS_KEY (see backend/.env.example)."
        );
    }
    return {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
}

function getEc2Client(region) {
    if (!region) {
        throw new Error("A region is required.");
    }
    if (!clientsByRegion[region]) {
        clientsByRegion[region] = new EC2Client({ region, credentials: credentials() });
    }
    return clientsByRegion[region];
}

function getSsmClient(region) {
    if (!region) {
        throw new Error("A region is required.");
    }
    if (!ssmClientsByRegion[region]) {
        ssmClientsByRegion[region] = new SSMClient({ region, credentials: credentials() });
    }
    return ssmClientsByRegion[region];
}

module.exports = { getEc2Client, getSsmClient };
