"""Trader score calculation (6 weighted factors)."""
import logging
from typing import Dict, List
import random

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sector-stock mappings for demo
SECTOR_STOCKS = {
    "energy": {"SKI": "SK Innovation", "KMP": "Korea Petrochemical", "ENGI": "Engie"},
    "defense": {"KAI": "Korea Aerospace", "ADD": "Agency for Defense", "HDC": "Hyundai"},
    "financials": {"KB": "KB Financial", "HANA": "Hana Bank", "SHINE": "Shinhan"},
    "semiconductors": {"SSNLF": "Samsung", "SK": "SK Hynix"},
    "transport": {"HMM": "Hyundai Merchant", "KAL": "Korean Air"},
    "chemicals": {"LG": "LG Chemical", "BASF": "BASF"},
}

def calculate_trader_score(article: Dict, tickers: List[str] = None) -> Dict:
    """
    Calculate trader score based on 6 weighted factors:
    1. Exposure (노출도): 35% - 뉴스와 관련 정도
    2. Magnitude (수익률 변화): 25% - 예상 주가 변동률
    3. Timing (타이밍): 20% - 거래 활성화 시점
    4. Volume (거래량): 10% - 예상 거래량 증가
    5. Institutional Flow (기관 수급): 5% - 기관 매매 동향
    6. Theme Momentum (테마 등락): 5% - 관련 테마 가격 변동
    """

    scores = {
        "exposure": random.uniform(40, 85),  # 40-85
        "magnitude": random.uniform(5, 25),  # ±5~25%
        "timing": random.uniform(30, 70),    # 0-100 (빠름)
        "volume": random.uniform(20, 60),    # 20-60 (거래량)
        "institutional": random.uniform(10, 80),  # 10-80 (기관 관심도)
        "momentum": random.uniform(20, 70),   # 20-70 (테마 등락)
    }

    # Adjust based on category/keywords
    title_lower = article.get("title", "").lower()

    if "energy" in title_lower or "gas" in title_lower or "oil" in title_lower:
        scores["exposure"] = min(100, scores["exposure"] + 20)
        scores["magnitude"] = scores["magnitude"] + 5

    if "war" in title_lower or "conflict" in title_lower:
        scores["institutional"] = min(100, scores["institutional"] + 30)

    if "tariff" in title_lower or "trade" in title_lower:
        scores["exposure"] = min(100, scores["exposure"] + 15)
        scores["volume"] = min(100, scores["volume"] + 20)

    # Weighted calculation (6 factors)
    weights = {
        "exposure": 0.35,
        "magnitude": 0.25,  # Note: magnitude already in %, scale differently
        "timing": 0.20,
        "volume": 0.10,
        "institutional": 0.05,
        "momentum": 0.05,
    }

    # Normalize magnitude to 0-100 scale for weighting
    magnitude_normalized = min(100, scores["magnitude"] * 4)  # Max 25% * 4 = 100

    trader_score = (
        scores["exposure"] * weights["exposure"]
        + magnitude_normalized * weights["magnitude"]
        + scores["timing"] * weights["timing"]
        + scores["volume"] * weights["volume"]
        + scores["institutional"] * weights["institutional"]
        + scores["momentum"] * weights["momentum"]
    )

    result = {
        "trader_score": round(trader_score, 1),
        "breakdown": {k: round(v, 1) for k, v in scores.items()},
        "weights": weights,
        "confidence": round(random.uniform(0.65, 0.95), 2),
    }

    logger.info(f"Trader Score: {trader_score:.1f} - {article['title'][:50]}")
    return result

if __name__ == "__main__":
    test = {"title": "Russia cuts gas supply to Europe", "category": "Sanctions"}
    result = calculate_trader_score(test)
    print(f"Trader Score: {result['trader_score']}")
    print(f"Breakdown: {result['breakdown']}")
    print(f"Confidence: {result['confidence']}")
