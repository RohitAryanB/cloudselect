const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Provider = require("./src/models/Provider");
const User = require("./src/models/User");

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        // Clear existing data
        await Provider.deleteMany({});
        await User.deleteMany({});

        console.log("🗑 Existing data cleared");

        // Providers
        await Provider.insertMany([
            {
                name: "Amazon Web Services",
                slug: "aws",
                description: "Leading cloud computing platform.",
                website: "https://aws.amazon.com",
                trialStatus: true,
                priceMin: 0,
                priceMax: 500,
                strengths: ["Scalable", "Reliable", "Global Infrastructure"],
                services: ["EC2", "S3", "Lambda", "RDS"],
                ratings: {
                    g2Rating: 4.7,
                    gartnerRating: 4.8,
                    trustRadiusRating: 4.6,
                    capteiraRating: 4.7,
                    overallRating: 4.7,
                    reviewCounts: {
                        g2: 12000,
                        gartner: 8000,
                        trustRadius: 6000,
                        capterra: 5000
                    },
                    lastUpdated: new Date()
                }
            },
            {
                name: "Microsoft Azure",
                slug: "azure",
                description: "Microsoft Cloud Platform.",
                website: "https://azure.microsoft.com",
                trialStatus: true,
                priceMin: 0,
                priceMax: 450,
                strengths: ["Enterprise", "Hybrid Cloud"],
                services: ["Virtual Machines", "Blob Storage", "Functions"],
                ratings: {
                    overallRating: 4.6,
                    lastUpdated: new Date()
                }
            },
            {
                name: "Google Cloud Platform",
                slug: "gcp",
                description: "Google Cloud Services.",
                website: "https://cloud.google.com",
                trialStatus: true,
                priceMin: 0,
                priceMax: 430,
                strengths: ["AI", "Big Data"],
                services: ["Compute Engine", "Cloud Storage", "BigQuery"],
                ratings: {
                    overallRating: 4.6,
                    lastUpdated: new Date()
                }
            },
            {
                name: "Oracle Cloud",
                slug: "oracle",
                description: "Oracle Cloud Infrastructure.",
                website: "https://www.oracle.com/cloud/",
                trialStatus: true,
                priceMin: 0,
                priceMax: 400,
                strengths: ["Database", "Enterprise Apps"],
                services: ["OCI Compute", "Object Storage"],
                ratings: {
                    overallRating: 4.3,
                    lastUpdated: new Date()
                }
            },
            {
                name: "IBM Cloud",
                slug: "ibm",
                description: "IBM Enterprise Cloud.",
                website: "https://www.ibm.com/cloud",
                trialStatus: true,
                priceMin: 0,
                priceMax: 390,
                strengths: ["AI", "Security"],
                services: ["Virtual Servers", "Kubernetes"],
                ratings: {
                    overallRating: 4.2,
                    lastUpdated: new Date()
                }
            }
        ]);

        console.log("✅ Providers inserted");

        // Users
        const password = await bcrypt.hash("password123", 10);

        await User.insertMany([
            {
                name: "Admin",
                email: "admin@cloudselect.com",
                password
            },
            {
                name: "Vikas",
                email: "vikas@gmail.com",
                password
            },
            {
                name: "Test User",
                email: "test@gmail.com",
                password
            }
        ]);

        console.log("✅ Users inserted");

        console.log("🎉 Database Seed Completed");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDatabase();