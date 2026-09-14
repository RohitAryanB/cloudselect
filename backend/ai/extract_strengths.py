import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_provider_data(raw_text, provider_name):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a cloud infrastructure analyst. Always respond with valid JSON only. No markdown, no explanation, just raw JSON."
            },
            {
                "role": "user",
                "content": f"""Analyze this {provider_name} cloud provider page and extract:
                1. Top 5 strengths
                2. Main services offered (list of service names)
                3. Key infrastructure highlights

                Return ONLY this JSON structure:
                {{
                    "provider": "{provider_name}",
                    "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5"],
                    "services": ["service1", "service2", "service3"],
                    "infrastructure": {{
                        "highlights": ["highlight1", "highlight2", "highlight3"],
                        "global_regions": null,
                        "certifications": []
                    }}
                }}

                Page content:
                {raw_text[:4000]}"""
            }
        ]
    )

    raw_output = response.choices[0].message.content.strip()

    # Clean up if model wraps in markdown
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```")[1]
        if raw_output.startswith("json"):
            raw_output = raw_output[4:]

    return json.loads(raw_output)


def process_provider(provider_name):
    input_path = f"data/raw/{provider_name.lower()}.txt"
    output_path = f"data/processed/{provider_name.lower()}.json"

    if not os.path.exists(input_path):
        print(f"❌ Raw file not found: {input_path}")
        return

    print(f"📄 Reading {input_path}...")
    with open(input_path, "r", encoding="utf-8") as f:
        raw_text = f.read()

    print(f"🤖 Extracting data for {provider_name}...")
    result = extract_provider_data(raw_text, provider_name)

    os.makedirs("data/processed", exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    print(f"✅ Saved to {output_path}")
    print(json.dumps(result, indent=2))
    return result


if __name__ == "__main__":
    # Process all providers you have raw data for
    providers = ["aws", "azure", "gcp", "ibm", "oracle"]

    for provider in providers:
        try:
            process_provider(provider)
            print("-" * 50)
        except Exception as e:
            print(f"❌ Failed for {provider}: {e}")