import os
import json
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["cloudselect"]

providers_col = db["providers"]
ratings_col   = db["ratings"]

PROVIDER_META = {
    "aws": {
        "name":        "Amazon Web Services",
        "slug":        "aws",
        "website":     "https://aws.amazon.com",
        "description": "The world's most comprehensive and broadly adopted cloud platform",
        "trialStatus": True,
        "priceMin":    0.01,
        "priceMax":    10000,
        "services":    ["EC2", "S3", "RDS", "Lambda", "EKS", "SageMaker", "CloudFront", "DynamoDB"],
        "strengths":   ["Market Leader", "Largest Service Catalog", "Global Infrastructure", "Mature Ecosystem", "Enterprise Support"]
    },
    "azure": {
        "name":        "Microsoft Azure",
        "slug":        "azure",
        "website":     "https://azure.microsoft.com",
        "description": "Microsoft's cloud platform with deep enterprise and hybrid integration",
        "trialStatus": True,
        "priceMin":    0.01,
        "priceMax":    10000,
        "services":    ["Virtual Machines", "Azure SQL", "AKS", "Azure Functions", "Cosmos DB", "Azure DevOps", "Power BI"],
        "strengths":   ["Microsoft Integration", "Hybrid Cloud", "Enterprise Focus", "Compliance", "AI Services"]
    },
    "gcp": {
        "name":        "Google Cloud Platform",
        "slug":        "gcp",
        "website":     "https://cloud.google.com",
        "description": "Google's cloud built on the same infrastructure that powers Google Search and YouTube",
        "trialStatus": True,
        "priceMin":    0.01,
        "priceMax":    10000,
        "services":    ["Compute Engine", "BigQuery", "GKE", "Cloud Run", "Vertex AI", "Cloud Spanner", "Pub/Sub"],
        "strengths":   ["AI & ML Leader", "Data Analytics", "Kubernetes Pioneer", "Network Performance", "Pricing"]
    },
    "ibm": {
        "name":        "IBM Cloud",
        "slug":        "ibm",
        "website":     "https://www.ibm.com/cloud",
        "description": "Enterprise-grade cloud with AI, blockchain and quantum computing capabilities",
        "trialStatus": True,
        "priceMin":    0.01,
        "priceMax":    5000,
        "services":    ["IBM Watson", "OpenShift", "Db2", "Cloud Pak", "Bare Metal", "IBM Blockchain"],
        "strengths":   ["Enterprise AI", "Hybrid Cloud", "Security", "Compliance", "Watson AI"]
    },
    "oracle": {
        "name":        "Oracle Cloud Infrastructure",
        "slug":        "oracle",
        "website":     "https://www.oracle.com/cloud",
        "description": "Enterprise cloud designed for mission-critical workloads with predictable pricing",
        "trialStatus": True,
        "priceMin":    0.00,
        "priceMax":    5000,
        "services":    ["OCI Compute", "Autonomous Database", "Oracle Analytics", "OKE", "OCI Functions"],
        "strengths":   ["Database Leader", "Predictable Pricing", "Always Free Tier", "ERP Integration", "Performance"]
    }
}

def save_providers_and_ratings():
    # Load all ratings
    with open("data/processed/all_ratings.json", "r") as f:
        all_ratings = json.load(f)

    ratings_by_slug = {r["slug"]: r for r in all_ratings}

    for slug, meta in PROVIDER_META.items():
        rating_data = ratings_by_slug.get(slug, {})

        # ── Upsert Provider ──────────────────────────────
        provider_doc = {
            **meta,
            "overallRating": rating_data.get("overallRating"),
            "updatedAt":     datetime.utcnow()
        }

        result = providers_col.update_one(
            {"slug": slug},
            {"$set": provider_doc, "$setOnInsert": {"createdAt": datetime.utcnow()}},
            upsert=True
        )
        provider_id = providers_col.find_one({"slug": slug})["_id"]
        print(f"✅ Provider saved: {meta['name']} (id: {provider_id})")

        # ── Upsert Ratings ───────────────────────────────
        ratings_doc = {
            "providerId":        provider_id,
            "providerSlug":      slug,
            "g2Rating":          rating_data.get("g2Rating"),
            "gartnerRating":     rating_data.get("gartnerRating"),
            "trustRadiusRating": rating_data.get("trustRadiusRating"),
            "capteiraRating":    rating_data.get("capteiraRating") or rating_data.get("capterraRating"),
            "overallRating":     rating_data.get("overallRating"),
            "reviewCounts":      rating_data.get("reviewCounts", {}),
            "note":              rating_data.get("note"),
            "scrapedAt":         datetime.utcnow()
        }

        ratings_col.update_one(
            {"providerSlug": slug},
            {"$set": ratings_doc, "$setOnInsert": {"createdAt": datetime.utcnow()}},
            upsert=True
        )
        print(f"  ⭐ Ratings saved: overall={rating_data.get('overallRating')}")

    print("\n✅ All data saved to MongoDB!")
    print(f"   Providers : {providers_col.count_documents({})}")
    print(f"   Ratings   : {ratings_col.count_documents({})}")

if __name__ == "__main__":
    save_providers_and_ratings()