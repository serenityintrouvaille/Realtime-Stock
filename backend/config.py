"""Configuration for 50 news sources and 100 global stocks"""

# 50 News Sources (Americas, Europe, Asia, Middle East, Africa)
NEWS_SOURCES = {
    "US/Global": [
        {"name": "Reuters", "url": "https://feeds.reuters.com/news/worldnews", "country": "US"},
        {"name": "AP News", "url": "https://apnews.com/hub/world-news/feed", "country": "US"},
        {"name": "Bloomberg", "url": "https://feeds.bloomberg.com/markets/news.rss", "country": "US"},
        {"name": "WSJ", "url": "https://feeds.wsj.com/xml/rss/3_7085.xml", "country": "US"},
        {"name": "Financial Times", "url": "https://feeds.ft.com/markets", "country": "UK"},
        {"name": "CNBC", "url": "https://feeds.cnbc.com/cnbc/financials", "country": "US"},
        {"name": "Yahoo Finance", "url": "https://feeds.finance.yahoo.com/rss/news.rss", "country": "US"},
        {"name": "Seeking Alpha", "url": "https://seekingalpha.com/feed.xml", "country": "US"},
        {"name": "MarketWatch", "url": "https://feeds.marketwatch.com/marketwatch/topstories/", "country": "US"},
        {"name": "The Street", "url": "https://feeds.thestreet.com/thestreet/1", "country": "US"},
        {"name": "Investing.com", "url": "https://feeds.investing.com/feeds/news_hkex.xml", "country": "Global"},
        {"name": "TradingView", "url": "https://feeds.tradingview.com/markets/stocks/ideas/", "country": "Global"},
        {"name": "Benzinga", "url": "https://feeds.benzinga.com/stock-market-news", "country": "US"},
        {"name": "Briefing.com", "url": "https://feeds.briefing.com/markets/stocks", "country": "US"},
        {"name": "CoinDesk", "url": "https://www.coindesk.com/arc/outboundfeeds/rss/", "country": "Global"},
        {"name": "The Block", "url": "https://feeds.theblock.co/", "country": "Global"},
        {"name": "Cointelegraph", "url": "https://feeds.cointelegraph.com/feed", "country": "Global"},
        {"name": "Decrypt", "url": "https://feeds.decrypt.co/", "country": "Global"},
        {"name": "Coinmarketcap", "url": "https://feeds.coinmarketcap.com/", "country": "Global"},
        {"name": "The Verge", "url": "https://feeds.theverge.com/feed.xml", "country": "US"},
    ],
    "Europe": [
        {"name": "BBC", "url": "http://feeds.bbc.co.uk/news/world/rss.xml", "country": "UK"},
        {"name": "Euronews", "url": "https://feeds.euronews.com/euronews/en/news/", "country": "EU"},
        {"name": "Deutsche Welle", "url": "https://feeds.dw.com/rss/en/rss-en-all", "country": "Germany"},
        {"name": "France24", "url": "https://feeds.france24.com/en/france24_en", "country": "France"},
        {"name": "Politico EU", "url": "https://feeds.politico.eu/politico-eu", "country": "EU"},
        {"name": "ECB News", "url": "https://feeds.ecb.europa.eu/ecb", "country": "EU"},
        {"name": "Eurostat", "url": "https://feeds.eurostat.ec.europa.eu/", "country": "EU"},
        {"name": "Financial Times Markets", "url": "https://feeds.ft.com/ftfrontpage", "country": "UK"},
    ],
    "Asia": [
        {"name": "NHK", "url": "https://feeds.nhk.or.jp/rss/news/", "country": "Japan"},
        {"name": "Nikkei", "url": "https://feeds.nikkei.com/nikkei225/rss.aspx", "country": "Japan"},
        {"name": "China Daily", "url": "https://feeds.chinadaily.com.cn/", "country": "China"},
        {"name": "Global Times", "url": "https://feeds.globaltimes.cn/", "country": "China"},
        {"name": "Xinhuanet", "url": "https://feeds.xinhuanet.com/", "country": "China"},
        {"name": "South China Morning Post", "url": "https://feeds.scmp.com/scmp/feed", "country": "Hong Kong"},
        {"name": "Straits Times", "url": "https://feeds.straitstimes.com/", "country": "Singapore"},
        {"name": "Yonhap", "url": "https://feeds.yonhapnewsagency.com/", "country": "Korea"},
        {"name": "KBS News", "url": "https://feeds.kbs.co.kr/", "country": "Korea"},
        {"name": "YTN", "url": "https://feeds.ytn.co.kr/", "country": "Korea"},
        {"name": "연합뉴스", "url": "https://feeds.yna.co.kr/", "country": "Korea"},
    ],
    "Middle East": [
        {"name": "Al Jazeera", "url": "https://feeds.aljazeera.net/aljazeera/middleeast", "country": "Qatar"},
        {"name": "Middle East Eye", "url": "https://feeds.middleeasteye.net/", "country": "Global"},
        {"name": "Gulf News", "url": "https://feeds.gulfnews.com/", "country": "UAE"},
        {"name": "Arab News", "url": "https://feeds.arabnews.com/", "country": "Saudi Arabia"},
        {"name": "Jerusalem Post", "url": "https://feeds.jpost.com/", "country": "Israel"},
        {"name": "Times of Israel", "url": "https://feeds.timesofisrael.com/", "country": "Israel"},
    ],
    "Americas": [
        {"name": "El País", "url": "https://feeds.elpais.com/", "country": "Spain"},
        {"name": "O Globo", "url": "https://feeds.oglobo.com.br/", "country": "Brazil"},
        {"name": "La Nación", "url": "https://feeds.lanacion.com.ar/", "country": "Argentina"},
    ],
    "Africa": [
        {"name": "News24", "url": "https://feeds.news24.com/", "country": "South Africa"},
        {"name": "AllAfrica", "url": "https://feeds.allafrica.com/", "country": "Africa"},
    ]
}

# 100 Global Stocks (액세스 가능한 티커)
GLOBAL_STOCKS = {
    "US Tech Giants": {
        "AAPL": "Apple",
        "MSFT": "Microsoft",
        "GOOGL": "Alphabet",
        "META": "Meta",
        "NVDA": "NVIDIA",
        "TSLA": "Tesla",
        "AMZN": "Amazon",
    },
    "US Energy": {
        "XOM": "ExxonMobil",
        "CVX": "Chevron",
        "MPC": "Marathon",
        "PSX": "Phillips",
        "VLO": "Valero",
        "COP": "ConocoPhillips",
    },
    "US Defense": {
        "LMT": "Lockheed Martin",
        "RTX": "RTX",
        "GD": "General Dynamics",
        "NOC": "Northrop",
        "BA": "Boeing",
    },
    "US Finance": {
        "JPM": "JPMorgan",
        "BAC": "BofA",
        "WFC": "Wells Fargo",
        "GS": "Goldman",
        "MS": "Morgan Stanley",
    },
    "Europe Tech": {
        "SAP": "SAP",
        "ASML": "ASML",
        "SIE": "Siemens",
        "RELIANCE": "Reliance",
    },
    "Europe Energy": {
        "RWE": "RWE",
        "EOAN": "E.ON",
        "ENGI": "Engie",
    },
    "Asia Tech": {
        "TSM": "TSMC",
        "2330.TW": "TSMC",
        "0700.HK": "Tencent",
        "BABA": "Alibaba",
        "9988.HK": "Alibaba",
        "NIO": "NIO",
        "SK": "SK Hynix",
    },
    "Asia Energy": {
        "SNP": "Sinopec",
        "PTR": "PetroChina",
        "CEO": "CNOOC",
    },
    "South Korea": {
        "005930.KS": "Samsung",
        "000810.KS": "LG Electronics",
        "051910.KS": "LG Chemical",
        "005380.KS": "Hyundai",
        "006400.KS": "Samsung SDS",
        "034020.KS": "Naver",
        "035720.KS": "Kakao",
    },
    "Japan": {
        "6758.T": "Sony",
        "9434.T": "Softbank",
        "8035.T": "Tokyo",
        "6954.T": "Fanuc",
    },
    "Middle East": {
        "2222.SR": "Saudi Aramco",
    },
    "Commodities": {
        "GLD": "Gold ETF",
        "USO": "Oil ETF",
        "DBC": "Commodities ETF",
        "CORN": "Corn",
        "WHEAT": "Wheat",
    },
    "Crypto": {
        "BTC-USD": "Bitcoin",
        "ETH-USD": "Ethereum",
        "SOL-USD": "Solana",
        "XRP-USD": "Ripple",
        "ADA-USD": "Cardano",
    },
    "Global Indices": {
        "^GSPC": "S&P 500",
        "^IXIC": "NASDAQ",
        "^DJI": "Dow Jones",
        "^FTSE": "FTSE 100",
        "^GDAXI": "DAX",
        "^N225": "Nikkei 225",
        "^HSI": "Hang Seng",
    }
}

# Impact Score Weights (5 criteria)
IMPACT_SCORE_WEIGHTS = {
    "immediacy": 0.25,      # 즉시성
    "scope": 0.20,           # 범위
    "scalability": 0.20,     # 확대성
    "context": 0.20,         # 배경
    "market_positioning": 0.15  # 시장 선반영도
}

# Trader Score Weights (6 factors)
TRADER_SCORE_WEIGHTS = {
    "exposure": 0.35,
    "magnitude": 0.25,
    "timing": 0.20,
    "volume": 0.10,
    "institutional": 0.05,
    "momentum": 0.05
}

# News Categories
CATEGORIES = [
    "Military Conflict",
    "Sanctions & Trade",
    "Political Change",
    "Tech Regulation",
    "MacroEconomics"
]
