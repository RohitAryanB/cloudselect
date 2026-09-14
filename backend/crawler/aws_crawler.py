import requests
from bs4 import BeautifulSoup
import os

url = "https://aws.amazon.com/products/"

response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

text = soup.get_text()

os.makedirs("data/raw", exist_ok=True)

with open("data/raw/aws.txt", "w", encoding="utf-8") as file:
    file.write(text)

print("AWS data saved successfully!")