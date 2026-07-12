from groq import Groq
import os, json
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

PROVIDERS = {
    "aws":    "Amazon Web Services (AWS)",
    "azure":  "Microsoft Azure",
    "gcp":    "Google Cloud Platform (GCP)",
    "ibm":    "IBM Cloud",
    "oracle": "Oracle Cloud Infrastructure (OCI)"
}

def get_ratings_via_ai(slug, provider_full_name):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """You are a cloud industry analyst with deep knowledge of 
                review platforms. You know the EXACT different ratings each cloud provider 
                has on each platform. Ratings vary significantly between providers.
                Return only valid JSON, no markdown, no explanation."""
            },
            {
                "role": "user",
                "content": f"""Give me the REAL and SPECIFIC ratings for {provider_full_name} 
                from these review platforms based on your training data (2023-2024).
                
                Important: Each provider has DIFFERENT ratings. AWS, Azure, GCP, IBM, Oracle 
                all score differently on each platform. Be specific and realistic.
                
                Known context:
                - AWS leads in market share but gets mixed reviews on complexity
                - Azure scores high with enterprise Microsoft users
                - GCP is praised for AI/ML but lower market share
                - IBM Cloud is niche, lower review volume
                - Oracle Cloud is competitive on price but lower brand recognition
                
                Return ONLY this JSON (no markdown):
                {{
                    "provider": "{provider_full_name}",
                    "slug": "{slug}",
                    "g2Rating": <number between 4.0-4.8>,
                    "gartnerRating": <number between 4.0-4.8>,
                    "trustRadiusRating": <number between 7.0-9.5 out of 10>,
                    "capteiraRating": <number between 3.8-4.8>,
                    "overallRating": <weighted average on 5-star scale>,
                    "reviewCounts": {{
                        "g2": <realistic number>,
                        "gartner": <realistic number>,
                        "trustRadius": <realistic number>,
                        "capterra": <realistic number>
                    }},
                    "note": "AI estimated based on 2023-2024 platform data"
                }}"""
            }
        ]
    )
    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw)


if __name__ == "__main__":
    all_ratings = []
    os.makedirs("data/processed", exist_ok=True)

    for slug, full_name in PROVIDERS.items():
        print(f"🤖 Getting ratings for {full_name}...")
        try:
            result = get_ratings_via_ai(slug, full_name)
            print(json.dumps(result, indent=2))
            all_ratings.append(result)

            with open(f"data/processed/{slug}_ratings.json", "w") as f:
                json.dump(result, f, indent=2)
            print(f"✅ Saved {slug}_ratings.json\n")

        except Exception as e:
            print(f"❌ Failed for {full_name}: {e}\n")

    with open("data/processed/all_ratings.json", "w") as f:
        json.dump(all_ratings, f, indent=2)

    print("✅ All ratings saved to data/processed/all_ratings.json")