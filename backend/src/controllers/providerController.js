const Provider = require("../models/Provider");
const mongoose = require("mongoose");

// GET /api/providers
exports.getProviders = async (req, res) => {
    try {
        const providers = await Provider.find().sort({ "ratings.overallRating": -1 });
        res.json({
            success: true,
            count: providers.length,
            data: providers
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// GET /api/providers/:id
exports.getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
            return res.status(404).json({ success: false, error: "Provider not found" });
        }
        res.json({ success: true, data: provider });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// GET /api/providers/slug/:slug
exports.getProviderBySlug = async (req, res) => {
    try {
        const provider = await Provider.findOne({ slug: req.params.slug });
        if (!provider) {
            return res.status(404).json({ success: false, error: "Provider not found" });
        }
        res.json({ success: true, data: provider });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// POST /api/providers
exports.createProvider = async (req, res) => {
    try {
        const provider = await Provider.create(req.body);
        res.status(201).json({ success: true, data: provider });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// GET /api/providers/compare?slugs=aws,azure,gcp
exports.compareProviders = async (req, res) => {
    try {
        const slugs = req.query.slugs?.split(",") || [];
        if (slugs.length < 2) {
            return res.status(400).json({ success: false, error: "Provide at least 2 slugs to compare" });
        }
        const providers = await Provider.find({ slug: { $in: slugs } });
        res.json({ success: true, count: providers.length, data: providers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};