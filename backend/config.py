"""한국 주식 시장 분석을 위한 설정 - 80% 한국 주식 + 20% 글로벌"""

# 50+ 뉴스 소스 (한국 + 글로벌)
NEWS_SOURCES = {
    "한국": [
        {"name": "연합뉴스", "url": "https://feeds.yonhapnewsagency.com/", "country": "Korea"},
        {"name": "뉴시스", "url": "https://feeds.newsis.com/", "country": "Korea"},
        {"name": "머니투데이", "url": "https://feeds.moneytoday.co.kr/", "country": "Korea"},
        {"name": "조선일보", "url": "https://feeds.chosun.com/", "country": "Korea"},
        {"name": "중앙일보", "url": "https://feeds.joins.com/", "country": "Korea"},
        {"name": "동아일보", "url": "https://feeds.donga.com/", "country": "Korea"},
        {"name": "한경비즈니스", "url": "https://feeds.hankyung.com/", "country": "Korea"},
        {"name": "매경이코노미", "url": "https://feeds.mk.co.kr/", "country": "Korea"},
        {"name": "이데일리", "url": "https://feeds.edaily.co.kr/", "country": "Korea"},
        {"name": "뉴데일리", "url": "https://feeds.newdaily.co.kr/", "country": "Korea"},
        {"name": "아이뉴스24", "url": "https://feeds.inews24.com/", "country": "Korea"},
        {"name": "헤럴드경제", "url": "https://feeds.heraldbiz.com/", "country": "Korea"},
        {"name": "파이낸셜뉴스", "url": "https://feeds.fnnews.com/", "country": "Korea"},
        {"name": "베리타스", "url": "https://feeds.veritas-a.com/", "country": "Korea"},
        {"name": "투데이신문", "url": "https://feeds.todaynews.co.kr/", "country": "Korea"},
        {"name": "비즈니스워치", "url": "https://feeds.businesswatch.co.kr/", "country": "Korea"},
        {"name": "지디넷코리아", "url": "https://feeds.zdnet.co.kr/", "country": "Korea"},
        {"name": "IT조선", "url": "https://feeds.itchosun.com/", "country": "Korea"},
        {"name": "한국경제", "url": "https://feeds.hankyung.com/", "country": "Korea"},
        {"name": "서울경제", "url": "https://feeds.sedaily.com/", "country": "Korea"},
    ],
    "US/Global": [
        {"name": "Reuters", "url": "https://feeds.reuters.com/news/worldnews", "country": "US"},
        {"name": "Bloomberg", "url": "https://feeds.bloomberg.com/markets/news.rss", "country": "US"},
        {"name": "CNBC", "url": "https://feeds.cnbc.com/cnbc/financials", "country": "US"},
        {"name": "Yahoo Finance", "url": "https://feeds.finance.yahoo.com/rss/news.rss", "country": "US"},
        {"name": "Seeking Alpha", "url": "https://seekingalpha.com/feed.xml", "country": "US"},
        {"name": "MarketWatch", "url": "https://feeds.marketwatch.com/marketwatch/topstories/", "country": "US"},
        {"name": "Investing.com", "url": "https://feeds.investing.com/feeds/news_hkex.xml", "country": "Global"},
        {"name": "Benzinga", "url": "https://feeds.benzinga.com/stock-market-news", "country": "US"},
        {"name": "Financial Times", "url": "https://feeds.ft.com/markets", "country": "UK"},
        {"name": "The Verge", "url": "https://feeds.theverge.com/feed.xml", "country": "US"},
    ],
    "중국/아시아": [
        {"name": "Nikkei (닛케이)", "url": "https://feeds.nikkei.com/nikkei225/rss.aspx", "country": "Japan"},
        {"name": "South China Morning Post", "url": "https://feeds.scmp.com/scmp/feed", "country": "Hong Kong"},
        {"name": "China Daily", "url": "https://feeds.chinadaily.com.cn/", "country": "China"},
        {"name": "Straits Times", "url": "https://feeds.straitstimes.com/", "country": "Singapore"},
        {"name": "NHK", "url": "https://feeds.nhk.or.jp/rss/news/", "country": "Japan"},
    ],
}

# 100+ 한국/글로벌 주식 (80% 한국, 20% 글로벌)
GLOBAL_STOCKS = {
    "한국 대형주 (대기업)": {
        "005930.KS": "Samsung (삼성전자)",
        "000660.KS": "SK Hynix (SK하이닉스)",
        "035420.KS": "NAVER (네이버)",
        "035720.KS": "Kakao (카카오)",
        "051910.KS": "LG Chemical (LG화학)",
        "000810.KS": "LG Electronics (LG전자)",
        "012330.KS": "Hyundai Motors (현대차)",
        "005380.KS": "Hyundai Motors Group (현대차그룹)",
        "015760.KS": "NSC (한국철강)",
        "010140.KS": "Samsung F1 (삼성전기)",
    },
    "한국 반도체/디스플레이": {
        "000660.KS": "SK Hynix",
        "006400.KS": "Samsung SDS",
        "036570.KS": "Samsung Display (삼성디스플레이)",
        "039440.KS": "LG Display (LG디스플레이)",
        "008770.KS": "호출",
    },
    "한국 자동차": {
        "012330.KS": "Hyundai Motors (현대차)",
        "005380.KS": "Hyundai Motor Group (현대차그룹)",
        "000270.KS": "Kia Motors (기아)",
        "012330.KS": "Hyundai Motors (현대차)",
    },
    "한국 금융": {
        "055550.KS": "Shinhan Bank (신한은행)",
        "086790.KS": "KB Financial (KB금융)",
        "000180.KS": "Samsung Fire (삼성화재)",
        "016360.KS": "Samsung SDI (삼성SDI)",
    },
    "한국 에너지/화학": {
        "051910.KS": "LG Chemical",
        "010120.KS": "Korea Electric Power (한전)",
        "047050.KS": "Posco (포스코)",
    },
    "한국 건설/부동산": {
        "011210.KS": "CJ Logistics (CJ대한통운)",
        "011700.KS": "Hanwha (한화)",
        "034730.KS": "SK Inc (SK)",
    },
    "한국 건설사": {
        "011210.KS": "CJ Logistics",
        "001390.KS": "Hyundai E&C (현대건설)",
        "001460.KS": "Samsung C&T (삼성물산)",
    },
    "한국 백화점/유통": {
        "071840.KS": "Lotte Corp (롯데)",
        "036460.KS": "LS Corp (LS)",
        "028670.KS": "Lotte Chemical (롯데케미칼)",
    },
    "한국 방위/기계": {
        "047810.KS": "Hanwha Corp (한화)",
        "005870.KS": "Daewoo Shipbuilding (대우조선)",
        "047050.KS": "Posco",
    },
    "한국 IT/통신": {
        "035720.KS": "Kakao",
        "035420.KS": "NAVER",
        "030200.KS": "KT Corp (KT)",
        "032640.KS": "LG Uplus (LG유플러스)",
    },
    "한국 ETF - 대형주": {
        "069500.KS": "KODEX 200 (코덱스200)",
        "102110.KS": "Tiger Korea 200 (타이거한국200)",
        "005010.KS": "Samsung Elec (삼성전자)",
        "005930.KS": "Samsung Electronics (삼성전자)",
    },
    "한국 ETF - 중형주": {
        "233160.KS": "TIGER 중형주 (타이거중형주)",
        "289080.KS": "KODEX 중형주",
    },
    "한국 KRX 지수": {
        "^KS11": "KOSPI Index (코스피)",
        "^KQ150": "KOSDAQ Index (코스닥)",
    },
    "글로벌 (비교)": {
        "AAPL": "Apple (애플)",
        "MSFT": "Microsoft (마이크로소프트)",
        "0700.HK": "Tencent (텐센트)",
        "9988.HK": "Alibaba (알리바바)",
        "TSM": "TSMC (대만반도체)",
        "NVDA": "NVIDIA (엔비디아)",
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

# 뉴스 카테고리 (한국 시장 중심)
CATEGORIES = [
    "경제 정책",
    "산업 규제",
    "국제 관계",
    "기업 공시",
    "기술 혁신",
    "무역 분쟁",
    "정치 변화",
    "시장 심리"
]
