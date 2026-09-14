/**
 * Provider-agnostic cloud control endpoints.
 *
 * Only "aws" is actually wired up right now, because that's the only
 * cloud account you have. "gcp" / "azure" / "oracle" are recognized so
 * the frontend can show them as real (but disabled) options, and they
 * respond with a clear 501 instead of a confusing crash.
 */
const awsEc2Service = require("../services/awsEc2Service");

const SUPPORTED_PROVIDERS = ["aws"];
const KNOWN_BUT_UNCONFIGURED_PROVIDERS = ["gcp", "azure", "oracle"];

function unsupportedProviderResponse(res, provider) {
    if (KNOWN_BUT_UNCONFIGURED_PROVIDERS.includes(provider)) {
        return res.status(501).json({
            success: false,
            error: `No ${provider.toUpperCase()} account is connected yet. Only AWS is currently wired up in this dashboard.`,
        });
    }
    return res.status(400).json({
        success: false,
        error: `Unknown provider "${provider}".`,
    });
}

function handleError(res, err) {
    const status = err.status || 500;
    res.status(status).json({ success: false, error: err.message });
}

// GET /api/cloud/:provider/meta
exports.getMeta = (req, res) => {
    const { provider } = req.params;
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
        return unsupportedProviderResponse(res, provider);
    }
    res.json({
        success: true,
        data: {
            regions: awsEc2Service.getAllowedRegions(),
            instanceTypes: awsEc2Service.getInstanceTypeCatalog(),
        },
    });
};

// GET /api/cloud/:provider/instances?region=us-east-1
exports.listInstances = async (req, res) => {
    const { provider } = req.params;
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
        return unsupportedProviderResponse(res, provider);
    }
    try {
        const { region } = req.query;
        if (!region) {
            return res.status(400).json({ success: false, error: "region query param is required" });
        }
        const data = await awsEc2Service.listInstances(region);
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        handleError(res, err);
    }
};

// POST /api/cloud/:provider/instances  { region, instanceType, name, keyName }
exports.launchInstance = async (req, res) => {
    const { provider } = req.params;
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
        return unsupportedProviderResponse(res, provider);
    }
    try {
        const { region, instanceType, name, keyName } = req.body;
        if (!region || !instanceType) {
            return res.status(400).json({ success: false, error: "region and instanceType are required" });
        }
        const data = await awsEc2Service.launchInstance({ region, instanceType, name, keyName });
        res.status(201).json({ success: true, data });
    } catch (err) {
        handleError(res, err);
    }
};

// POST /api/cloud/:provider/instances/:id/start  { region }
exports.startInstance = async (req, res) => {
    const { provider, id } = req.params;
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
        return unsupportedProviderResponse(res, provider);
    }
    try {
        const { region } = req.body;
        if (!region) {
            return res.status(400).json({ success: false, error: "region is required" });
        }
        const data = await awsEc2Service.startInstance(region, id);
        res.json({ success: true, data });
    } catch (err) {
        handleError(res, err);
    }
};

// POST /api/cloud/:provider/instances/:id/stop  { region }
exports.stopInstance = async (req, res) => {
    const { provider, id } = req.params;
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
        return unsupportedProviderResponse(res, provider);
    }
    try {
        const { region } = req.body;
        if (!region) {
            return res.status(400).json({ success: false, error: "region is required" });
        }
        const data = await awsEc2Service.stopInstance(region, id);
        res.json({ success: true, data });
    } catch (err) {
        handleError(res, err);
    }
};

// DELETE /api/cloud/:provider/instances/:id?region=us-east-1
exports.terminateInstance = async (req, res) => {
    const { provider, id } = req.params;
    if (!SUPPORTED_PROVIDERS.includes(provider)) {
        return unsupportedProviderResponse(res, provider);
    }
    try {
        const { region } = req.query;
        if (!region) {
            return res.status(400).json({ success: false, error: "region query param is required" });
        }
        const data = await awsEc2Service.terminateInstance(region, id);
        res.json({ success: true, data });
    } catch (err) {
        handleError(res, err);
    }
};
