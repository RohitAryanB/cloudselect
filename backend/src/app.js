const express = require("express");
const cors = require("cors");

const providerRoutes = require("./routes/providerRoutes");
const authRoutes = require("./routes/authRoutes");
const cloudRoutes = require("./routes/cloudRoutes");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "cloudselect-backend" });
});

app.use("/api/providers", providerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cloud", cloudRoutes);
module.exports = app;
