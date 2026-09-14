const express = require("express");
const router = express.Router();

const {
    getMeta,
    listInstances,
    launchInstance,
    startInstance,
    stopInstance,
    terminateInstance,
} = require("../controllers/cloudController");

const { protect } = require("../middleware/auth");

// Every route here requires a logged-in user (see js/login.js on the frontend).
router.get("/:provider/meta", protect, getMeta);
router.get("/:provider/instances", protect, listInstances);
router.post("/:provider/instances", protect, launchInstance);
router.post("/:provider/instances/:id/start", protect, startInstance);
router.post("/:provider/instances/:id/stop", protect, stopInstance);
router.delete("/:provider/instances/:id", protect, terminateInstance);

module.exports = router;
