const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
    {
        name:        { type: String, required: true },
        slug:        { type: String, required: true, unique: true },
        description: { type: String },
        website:     { type: String },
        trialStatus: { type: Boolean, default: false },
        priceMin:    { type: Number },
        priceMax:    { type: Number },
        strengths:   [String],
        services:    [String],

        // Ratings embedded directly on provider
        ratings: {
            g2Rating:          { type: Number },
            gartnerRating:     { type: Number },
            trustRadiusRating: { type: Number },
            capteiraRating:    { type: Number },
            overallRating:     { type: Number },
            reviewCounts: {
                g2:          { type: Number },
                gartner:     { type: Number },
                trustRadius: { type: Number },
                capterra:    { type: Number }
            },
            lastUpdated: { type: Date }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);