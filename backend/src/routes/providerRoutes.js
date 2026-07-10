const express = require("express");

const router = express.Router();

const {
    getProviders,
    createProvider,
    getProviderById
} = require("../controllers/providerController");

router.get("/", getProviders);

router.post("/", createProvider);

router.get("/:id", getProviderById);

module.exports = router;