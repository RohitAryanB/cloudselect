import os
import json
from pymongo import MongoClient
from datetime import datetime, UTC
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["cloudselect"]

providers_col = db["providers"]
ratings_col   = db["ratings"]

def migrate():
    ratings = list(ratings_col.find())

    for r in ratings:
        slug = r.get("providerSlug")
        if not slug:
            continue

        update = {
            "ratings": {
                "g2Rating":          r.get("g2Rating"),
                "gartnerRating":     r.get("gartnerRating"),
                "trustRadiusRating": r.get("trustRadiusRating"),
                "capteiraRating":    r.get("capteiraRating") or r.get("capterraRating"),
                "overallRating":     r.get("overallRating"),
                "reviewCounts":      r.get("reviewCounts", {}),
                "lastUpdated":       datetime.now(UTC)
            }
        }

        result = providers_col.update_one(
            {"slug": slug},
            {"$set": update}
        )
        print(f"✅ Migrated ratings for {slug} — matched: {result.matched_count}")

    # Remove duplicate provider (Providers: 6 issue)
    slugs_seen = set()
    for doc in providers_col.find():
        slug = doc.get("slug")
        if slug in slugs_seen:
            providers_col.delete_one({"_id": doc["_id"]})
            print(f"🗑️  Removed duplicate: {slug}")
        else:
            slugs_seen.add(slug)

    print(f"\n✅ Migration complete!")
    print(f"   Providers : {providers_col.count_documents({})}")

if __name__ == "__main__":
    migrate()