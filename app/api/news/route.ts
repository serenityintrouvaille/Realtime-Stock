export async function GET() {
  const newsData = [
    {
      "id": "reuters_001",
      "title": "Russia announces military buildup near Ukraine border",
      "summary": "Russia has announced a significant increase in military presence along its border with Ukraine, raising concerns among NATO members about regional stability.",
      "source": "Reuters",
      "country": "Russia",
      "region": "Europe",
      "url": "https://reuters.com/news",
      "timestamp": "2026-03-08T14:30:00Z",
      "category": "Military Conflict",
      "impact_score": 85,
      "category_confidence": 0.95
    },
    {
      "id": "bloomberg_002",
      "title": "US imposes new tariffs on Chinese semiconductor imports",
      "summary": "The Biden administration has announced new tariffs on advanced semiconductors from China, citing national security concerns.",
      "source": "Bloomberg",
      "country": "US",
      "region": "Americas",
      "url": "https://bloomberg.com/news",
      "timestamp": "2026-03-08T13:15:00Z",
      "category": "Sanctions & Trade",
      "impact_score": 78,
      "category_confidence": 0.92
    },
    {
      "id": "ft_003",
      "title": "ECB signals potential rate cuts in coming months",
      "summary": "The European Central Bank hinted at potential interest rate reductions as inflation continues to decline across the eurozone.",
      "source": "Financial Times",
      "country": "EU",
      "region": "Europe",
      "url": "https://ft.com/news",
      "timestamp": "2026-03-08T12:45:00Z",
      "category": "MacroEconomics",
      "impact_score": 72,
      "category_confidence": 0.88
    },
    {
      "id": "bbc_004",
      "title": "UK government proposes new AI regulation framework",
      "summary": "The UK government has unveiled its new framework for regulating artificial intelligence, focusing on transparency and safety standards.",
      "source": "BBC",
      "country": "UK",
      "region": "Europe",
      "url": "https://bbc.com/news",
      "timestamp": "2026-03-08T11:20:00Z",
      "category": "Tech Regulation",
      "impact_score": 68,
      "category_confidence": 0.85
    },
    {
      "id": "cnbc_005",
      "title": "S&P 500 reaches new all-time high amid tech rally",
      "summary": "The S&P 500 index hit a new all-time high today, driven primarily by strong performances from major technology companies.",
      "source": "CNBC",
      "country": "US",
      "region": "Americas",
      "url": "https://cnbc.com/news",
      "timestamp": "2026-03-08T10:00:00Z",
      "category": "MacroEconomics",
      "impact_score": 65,
      "category_confidence": 0.80
    }
  ];

  return new Response(JSON.stringify(newsData), {
    headers: { 'Content-Type': 'application/json' },
  });
}
