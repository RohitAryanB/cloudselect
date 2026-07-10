const Provider = require("../models/Provider");

exports.getProviders = async (req, res) => {
    const providers = await Provider.find();

    res.json(providers);
};

exports.createProvider = async (req, res) => {

    const provider = await Provider.create(req.body);

    res.status(201).json(provider);
};

exports.getProviderById = async (req, res) => {

    const provider = await Provider.findById(req.params.id);

    res.json(provider);
};