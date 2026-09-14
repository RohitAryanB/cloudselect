const express = require("express");
const router = express.Router();

const {
    getProviders,
    createProvider,
    getProviderById,
    getProviderBySlug,
    compareProviders
} = require("../controllers/providerController");

router.get("/",              getProviders);
router.get("/compare",       compareProviders);
router.get("/slug/:slug",    getProviderBySlug);
router.get("/:id",           getProviderById);
router.post("/",             createProvider);

module.exports = router;