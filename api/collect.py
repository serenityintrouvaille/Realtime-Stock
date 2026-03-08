"""
GeopoliticStock News Collector
50개 RSS 피드 수집 + Gemini 분류 + 한국어 요약
"""

import feedparser
import google.generativeai as genai
import json
from datetime import datetime
from typing import List, Dict
import os
import time

# 50개 RSS 피드 (8개 카테고리)
RSS_FEEDS = {
    # 글로벌 뉴스 (12개)
    'reuters_world': 'https://feeds.reuters.com/reuters/worldNews',
    'bbc_world': 'http://feeds.bbci.co.uk/news/world/rss.xml',
    'cnn_world': 'https://rss.cnn.com/rss/edition_world.rss',
    'aljazeera': 'https://www.aljazeera.com/xml/rss/all.xml',
    'apnews': 'https://apnews.com/hub/world-news/rss',
    'guardian': 'https://www.theguardian.com/world/rss',
    'nytimes': 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    'wsj': 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    'ft': 'https://www.ft.com/rss/home/world',
    'foreign_policy': 'https://foreignpolicy.com/feed/',
    'theintercept': 'https://theintercept.com/feed/',
    'vox': 'https://www.vox.com/rss/world-politics/index.xml',

    # 금융/경제 (8개)
    'bloomberg': 'https://feeds.bloomberg.com/markets/news.rss',
    'marketwatch': 'https://www.marketwatch.com/rss/topstories',
    'wsj_markets': 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
    'cnbc': 'https://www.cnbc.com/id/10000664/device/rss/rss.html',
    'seekingalpha': 'https://seekingalpha.com/market_currents.xml',
    'economist': 'https://www.economist.com/finance-and-economics/rss.xml',
    'imf': 'https://www.imf.org/en/News/Rss',
    'reuters_business': 'https://feeds.reuters.com/reuters/businessNews',

    # 지정학 (5개)
    'cfr': 'https://www.cfr.org/rss.xml',
    'foreign_affairs': 'https://www.foreignaffairs.com/rss.xml',
    'chatham': 'https://www.chathamhouse.org/rss.xml',
    'rusi': 'https://rusi.org/rss.xml',
    'brookings': 'https://www.brookings.edu/feed/',

    # 테크/AI 규제 (8개)
    'techcrunch': 'https://techcrunch.com/feed/',
    'wired': 'https://www.wired.com/feed/rss',
    'arstechnica': 'https://feeds.arstechnica.com/arstechnica/index',
    'mittech': 'https://www.technologyreview.com/feed/',
    'venturebeat': 'https://venturebeat.com/feed/',
    'zdnet': 'https://www.zdnet.com/rss.xml',
    'euractiv_digital': 'https://euractiv.com/sections/digital/feed/',
    'iapp': 'https://iapp.org/feed/',

    # 아시아 (6개)
    'nhk': 'https://www3.nhk.or.jp/nhkworld/en/news/feeds/',
    'scmp': 'https://www.scmp.com/rss/91/feed',
    'koreaherald': 'https://www.koreaherald.com/rss/020100000000.xml',
    'hani': 'https://english.hani.co.kr/rss',
    'thehindu': 'https://www.thehindu.com/news/international/?service=rss',
    'japantoday': 'https://japantoday.com/feed',

    # 중동/유럽 (5개)
    'haaretz': 'https://www.haaretz.com/rss',
    'middleeasteye': 'https://www.middleeasteye.net/rss',
    'euractiv': 'https://euractiv.com/feed/',
    'euobserver': 'https://www.euobserver.com/rss',
    'arabicpost': 'https://arabicpost.net/feed',

    # 에너지/환경 (4개)
    'reuters_env': 'https://feeds.reuters.com/reuters/environment',
    'oilprice': 'https://oilprice.com/rss/main',
    'energymonitor': 'https://www.energymonitor.ai/feed',
    'spglobal': 'https://www.spglobal.com/commodityinsights/en/rss/all-news',

    # 방위/안보 (2개)
    'breakingdefense': 'https://breakingdefense.com/feed/',
    'defensenews': 'https://www.defensenews.com/rss/',
}

CATEGORIES = [
    "군사·갈등",
    "제재·무역",
    "정치변화",
    "테크규제",
    "거시경제"
]

def collect_news() -> List[Dict]:
    """50개 RSS 피드에서 뉴스 수집"""
    all_news = []

    for source_name, feed_url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:3]:  # 각 피드에서 3개
                title = entry.get('title', '')
                link = entry.get('link', '')
                summary = entry.get('summary', '')[:300]
                published = entry.get('published', '')

                if title and link:
                    all_news.append({
                        'title': title,
                        'link': link,
                        'summary': summary,
                        'source': source_name,
                        'published': published,
                    })
            time.sleep(0.2)
        except Exception as e:
            print(f"Error: {source_name} - {str(e)}")
            continue

    return all_news

def classify_news(news: List[Dict]) -> List[Dict]:
    """Gemini로 뉴스 분류"""
    genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
    model = genai.GenerativeModel('gemini-1.5-flash')

    for item in news:
        try:
            prompt = f"""다음 뉴스를 5개 카테고리 중 하나로 분류하세요:
- 군사·갈등
- 제재·무역
- 정치변화
- 테크규제
- 거시경제

제목: {item['title']}
요약: {item['summary'][:200]}

JSON으로만 응답:
{{"category": "카테고리명", "confidence": 신뢰도0-100}}"""

            response = model.generate_content(prompt)
            result = json.loads(response.text)
            item['category'] = result.get('category', '거시경제')
            item['confidence'] = result.get('confidence', 50)
            time.sleep(0.3)
        except:
            item['category'] = '거시경제'
            item['confidence'] = 50

    return news

def generate_summary(news: List[Dict]) -> str:
    """오늘의 한국어 요약 생성"""
    genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
    model = genai.GenerativeModel('gemini-1.5-flash')

    top_news = news[:10]
    news_text = "\n".join([f"• {n['title']} ({n['category']})" for n in top_news])

    prompt = f"""다음은 오늘 글로벌 뉴스입니다:
{news_text}

이 뉴스를 바탕으로 오늘의 지정학적 상황을 500-800자의 한국어로 요약하세요.
주요 이슈, 영향도, 투자 관점을 포함하세요."""

    response = model.generate_content(prompt)
    return response.text

def main():
    """메인 수집 함수"""
    print("📡 뉴스 수집 시작...")
    news = collect_news()
    print(f"✅ {len(news)}개 뉴스 수집 완료")

    print("🏷️ 카테고리 분류 중...")
    news = classify_news(news)
    print("✅ 분류 완료")

    print("📝 한국어 요약 생성 중...")
    summary = generate_summary(news)
    print("✅ 요약 완료")

    # 저장
    data = {
        'timestamp': datetime.now().isoformat(),
        'total_articles': len(news),
        'summary': summary,
        'articles': news[:150],  # 상위 150개
    }

    os.makedirs('data', exist_ok=True)
    with open('data/news_latest.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"💾 data/news_latest.json 저장 완료")
    return data

if __name__ == '__main__':
    main()
