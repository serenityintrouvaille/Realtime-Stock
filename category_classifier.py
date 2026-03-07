"""News classifier using Google Gemini API."""
import os
import json
from typing import Dict, Tuple
import logging
import google.generativeai as genai

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Gemini API
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

CATEGORIES = [
    "Military Conflict",
    "Sanctions & Trade",
    "Political Change",
    "Tech Regulation",
    "MacroEconomics",
]

def classify_news(title: str, summary: str) -> Tuple[str, float]:
    """Classify news into one of 5 categories using Gemini."""

    if not API_KEY:
        return "MacroEconomics", 0.5  # Fallback

    try:
        prompt = f"""Classify this news into ONE category and provide confidence (0-1):

Categories: {', '.join(CATEGORIES)}

News Title: {title}
Summary: {summary}

Respond in JSON format:
{{"category": "category_name", "confidence": 0.85}}"""

        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)

        result = json.loads(response.text)
        category = result.get("category", "MacroEconomics")
        confidence = result.get("confidence", 0.5)

        return category, confidence
    except Exception as e:
        logger.error(f"Classification error: {e}")
        return "MacroEconomics", 0.5

def classify_batch(articles: list) -> list:
    """Classify multiple articles."""
    for article in articles:
        category, confidence = classify_news(article["title"], article["summary"])
        article["category"] = category
        article["category_confidence"] = confidence
        logger.info(f"Classified: {category} ({confidence:.2f}) - {article['title'][:50]}")

    return articles

if __name__ == "__main__":
    test_articles = [
        {
            "title": "Russia cuts gas supply to Europe by 50%",
            "summary": "Russian energy giant reduces natural gas exports..."
        },
        {
            "title": "US imposes new tariffs on Chinese imports",
            "summary": "Trade tensions escalate as new tariffs take effect..."
        }
    ]

    result = classify_batch(test_articles)
    for r in result:
        print(f"{r['category']}: {r['title'][:60]}")
