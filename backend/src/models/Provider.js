const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
{
    name: String,
    rating: Number,
    trialStatus: String,
    priceMin: Number,
    priceMax: Number,
    strengths: [String],
    services: [String]
},
{ timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);