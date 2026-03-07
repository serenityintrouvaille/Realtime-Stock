"""News scraper for RSS feeds and geopolitical events."""
import feedparser
import requests
from datetime import datetime
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Major international news sources (free RSS feeds)
NEWS_SOURCES = [
    {"name": "Reuters", "url": "https://feeds.reuters.com/news/worldnews"},
    {"name": "AP News", "url": "https://apnews.com/hub/world-news/feed"},
    {"name": "BBC News", "url": "http://feeds.bbc.co.uk/news/world/rss.xml"},
    {"name": "CoinDesk", "url": "https://www.coindesk.com/arc/outboundfeeds/rss/"},
    {"name": "Financial Times", "url": "https://feeds.ft.com/markets"},
]

def fetch_news() -> List[Dict]:
    """Fetch latest news from RSS feeds."""
    all_articles = []

    for source in NEWS_SOURCES:
        try:
            feed = feedparser.parse(source["url"])

            for entry in feed.entries[:5]:  # Latest 5 per source
                article = {
                    "id": f"{source['name']}_{hash(entry.title) % 10000}",
                    "title": entry.get("title", ""),
                    "summary": entry.get("summary", "")[:500],
                    "source": source["name"],
                    "url": entry.get("link", ""),
                    "timestamp": datetime.now().isoformat(),
                    "category": None,  # Will be filled by classifier
                    "impact_score": None,
                }
                all_articles.append(article)
                logger.info(f"Scraped: {article['title'][:50]}...")
        except Exception as e:
            logger.error(f"Error scraping {source['name']}: {e}")
            continue

    return all_articles

if __name__ == "__main__":
    news = fetch_news()
    print(f"Fetched {len(news)} articles")
    for article in news[:3]:
        print(f"- {article['source']}: {article['title'][:60]}")
