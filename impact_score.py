"""Impact Score calculation (5 criteria)."""
import logging
from typing import Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def calculate_impact_score(article: Dict) -> float:
    """
    Calculate impact score (0-100) based on 5 criteria:
    1. Immediacy (즉시성): 24시간 내 시장 반응
    2. Scope (범위): 영향받는 국가/산업 수
    3. Scalability (확대성): 추가 악화 가능성
    4. Context (배경): 누적된 긴장도
    5. Market Positioning (시장 선반영도): 이미 가격에 반영되었는가
    """

    # Rule-based scoring for demo
    title_lower = article.get("title", "").lower()
    category = article.get("category", "")

    scores = {
        "immediacy": 50,
        "scope": 50,
        "scalability": 50,
        "context": 50,
        "market_positioning": 50,
    }

    # Keyword-based adjustments
    high_impact_keywords = [
        "war", "attack", "sanctions", "ban", "crisis", "collapse", "conflict", "death"
    ]
    medium_impact_keywords = ["risk", "uncertainty", "decline", "tariff", "regulation"]

    for keyword in high_impact_keywords:
        if keyword in title_lower:
            scores["immediacy"] = min(100, scores["immediacy"] + 20)
            scores["scalability"] = min(100, scores["scalability"] + 15)

    for keyword in medium_impact_keywords:
        if keyword in title_lower:
            scores["immediacy"] = min(100, scores["immediacy"] + 10)

    # Category-based adjustments
    if category == "Military Conflict":
        scores["immediacy"] = min(100, scores["immediacy"] + 30)
        scores["scalability"] = min(100, scores["scalability"] + 25)
    elif category == "Sanctions & Trade":
        scores["scope"] = min(100, scores["scope"] + 20)
    elif category == "MacroEconomics":
        scores["context"] = min(100, scores["context"] + 20)

    # Average all 5 criteria
    impact_score = sum(scores.values()) / len(scores)

    logger.info(f"Impact Score: {impact_score:.1f} - {article['title'][:50]}")
    return round(impact_score, 1)

if __name__ == "__main__":
    test = {
        "title": "Russia cuts gas supply to Europe by 50%",
        "category": "Sanctions & Trade"
    }
    score = calculate_impact_score(test)
    print(f"Impact Score: {score}")
