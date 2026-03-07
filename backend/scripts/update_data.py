#!/usr/bin/env python3
"""Main script: Fetch news, classify, score, and fetch stock prices"""
import os
import json
from datetime import datetime
import feedparser
import yfinance as yf
import google.generativeai as genai
from pathlib import Path
import sys

# Add parent to path
sys.path.insert(0, str(Path(__file__).parent.parent))
from config import NEWS_SOURCES, GLOBAL_STOCKS, CATEGORIES

# Configure Gemini
API_KEY = os.getenv("GOOGLE_API_KEY", "")
if API_KEY:
    genai.configure(api_key=API_KEY)

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

def fetch_news():
    """Fetch from 50 news sources"""
    print("📰 Fetching news from 50 sources...")
    all_articles = []

    for region, sources in NEWS_SOURCES.items():
        for source in sources:
            try:
                feed = feedparser.parse(source["url"])
                for entry in feed.entries[:2]:  # 2 per source = 100 articles
                    article = {
                        "id": f"{source['name']}_{hash(entry.title) % 10000}",
                        "title": entry.get("title", ""),
                        "summary": entry.get("summary", "")[:500],
                        "source": source["name"],
                        "country": source.get("country", ""),
                        "region": region,
                        "url": entry.get("link", ""),
                        "timestamp": datetime.now().isoformat(),
                        "category": None,
                        "impact_score": None,
                    }
                    all_articles.append(article)
            except Exception as e:
                print(f"  ⚠️ Error {source['name']}: {str(e)[:50]}")
                continue

    print(f"✅ Fetched {len(all_articles)} articles")
    return all_articles

def classify_news(articles):
    """Classify with Gemini"""
    print("🤖 Classifying news...")

    if not API_KEY:
        print("  ⚠️ No API key, using default classification")
        for article in articles:
            article["category"] = "MacroEconomics"
            article["category_confidence"] = 0.5
        return articles

    for i, article in enumerate(articles):
        if i % 20 == 0:
            print(f"  Processing {i}/{len(articles)}...")

        try:
            prompt = f"""Classify this news into ONE category with confidence (0-1):
Categories: {', '.join(CATEGORIES)}
Title: {article['title']}
Summary: {article['summary']}
Respond only: {{"category": "...", "confidence": 0.85}}"""

            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(prompt)
            result = json.loads(response.text)

            article["category"] = result.get("category", "MacroEconomics")
            article["category_confidence"] = result.get("confidence", 0.5)
        except Exception as e:
            article["category"] = "MacroEconomics"
            article["category_confidence"] = 0.5

    print(f"✅ Classified {len(articles)} articles")
    return articles

def calculate_impact_scores(articles):
    """Calculate impact scores (5 criteria)"""
    print("📊 Calculating impact scores...")

    for article in articles:
        title_lower = article["title"].lower()

        scores = {
            "immediacy": 50,
            "scope": 50,
            "scalability": 50,
            "context": 50,
            "market_positioning": 50,
        }

        # Keyword adjustments
        high_keywords = ["war", "attack", "sanctions", "crisis", "conflict"]
        for kw in high_keywords:
            if kw in title_lower:
                scores["immediacy"] += 20
                scores["scalability"] += 15

        # Category adjustments
        if article["category"] == "Military Conflict":
            scores["immediacy"] += 20
            scores["scalability"] += 15
        elif article["category"] == "Sanctions & Trade":
            scores["scope"] += 15

        article["impact_score"] = round(sum(scores.values()) / len(scores), 1)

    print(f"✅ Calculated scores for {len(articles)} articles")
    return articles

def fetch_stock_prices():
    """Fetch prices for 100 global stocks"""
    print("📈 Fetching 100 global stock prices...")
    stocks_data = []

    tickers_list = []
    for category, stocks in GLOBAL_STOCKS.items():
        tickers_list.extend(stocks.keys())

    for i, ticker in enumerate(tickers_list):
        if i % 20 == 0:
            print(f"  Fetching {i}/{len(tickers_list)}...")

        try:
            stock = yf.Ticker(ticker)
            data = stock.history(period="5d")

            if data.empty:
                continue

            current_price = data["Close"].iloc[-1]
            prev_price = data["Close"].iloc[-2] if len(data) > 1 else current_price
            change_pct = ((current_price - prev_price) / prev_price * 100) if prev_price != 0 else 0

            # 20-day momentum
            data_20d = stock.history(period="20d")
            momentum = ((current_price - data_20d["Close"].iloc[0]) / data_20d["Close"].iloc[0] * 100) if len(data_20d) > 1 else 0

            stocks_data.append({
                "ticker": ticker,
                "price": round(current_price, 2),
                "change": round(change_pct, 2),
                "momentum_20d": round(momentum, 2),
            })
        except Exception as e:
            pass  # Skip failed tickers

    print(f"✅ Fetched {len(stocks_data)} stock prices")
    return stocks_data

def save_data(news, stocks):
    """Save all data to JSON files"""
    print("💾 Saving data...")

    # Sort by impact score
    news_sorted = sorted(news, key=lambda x: x.get("impact_score", 0), reverse=True)

    # Top winners/losers
    stocks_sorted_up = sorted(stocks, key=lambda x: x["change"], reverse=True)
    stocks_sorted_down = sorted(stocks, key=lambda x: x["change"])

    # Save files
    with open(DATA_DIR / "news.json", "w") as f:
        json.dump(news_sorted[:100], f, indent=2)  # Top 100 news

    with open(DATA_DIR / "stocks.json", "w") as f:
        json.dump(stocks, f, indent=2)

    with open(DATA_DIR / "winners.json", "w") as f:
        json.dump(stocks_sorted_up[:20], f, indent=2)  # Top 20 winners

    with open(DATA_DIR / "losers.json", "w") as f:
        json.dump(stocks_sorted_down[:20], f, indent=2)  # Top 20 losers

    with open(DATA_DIR / "metadata.json", "w") as f:
        json.dump({
            "last_update": datetime.now().isoformat(),
            "total_news": len(news),
            "total_stocks": len(stocks),
        }, f, indent=2)

    print("✅ Data saved to backend/data/")

def main():
    """Main pipeline"""
    print("🚀 Starting data update pipeline...")
    print(f"   Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    # Run pipeline
    news = fetch_news()
    news = classify_news(news)
    news = calculate_impact_scores(news)
    stocks = fetch_stock_prices()
    save_data(news, stocks)

    print("=" * 50)
    print("✅ Pipeline completed successfully!")

if __name__ == "__main__":
    main()
