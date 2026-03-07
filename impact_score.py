"""한국 시장 영향도 점수 계산 (5 기준)."""
import logging
from typing import Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def calculate_impact_score(article: Dict) -> float:
    """
    한국 주식 시장 영향도 점수 계산 (0-100):
    1. Immediacy (즉시성): 24시간 내 시장 반응 정도
    2. Scope (범위): 영향받는 산업/종목 수
    3. Scalability (확대성): 추가 악화 가능성
    4. Context (배경): 누적된 긴장도
    5. Market Positioning (시장 선반영도): 이미 가격에 반영 정도

    한국 시장 가중치:
    - 삼성, SK, 현대 등 대형주는 +15 추가
    - 수출 주도 산업은 +10 추가
    - 반도체 뉴스는 +20 추가
    """

    # Rule-based scoring
    title_lower = article.get("title", "").lower()
    category = article.get("category", "")

    scores = {
        "immediacy": 50,
        "scope": 50,
        "scalability": 50,
        "context": 50,
        "market_positioning": 50,
    }

    # 한국 기업 언급 시 높은 가중치
    korean_company_keywords = [
        "삼성", "samsung", "sk", "현대", "hyundai", "lg", "naver", "kakao", "기아",
        "한화", "롯데", "포스코", "한전", "대우", "해운", "조선"
    ]

    # 한국 산업 언급
    korean_sector_keywords = {
        "반도체": 20,  # 한국의 핵심 수출 산업
        "자동차": 15,
        "디스플레이": 18,
        "화학": 12,
        "건설": 10,
        "통신": 10,
        "해운": 14,
        "조선": 14,
        "은행": 8,
    }

    # 높은 영향 키워드 (한국 맥락)
    high_impact_keywords = [
        "전쟁", "공격", "제재", "금지", "위기", "붕괴", "분쟁", "사망",
        "war", "attack", "sanctions", "ban", "crisis", "collapse", "conflict"
    ]

    # 중간 영향 키워드
    medium_impact_keywords = [
        "위험", "불확실", "하락", "관세", "규제", "리스크", "약화",
        "risk", "uncertainty", "decline", "tariff", "regulation"
    ]

    # 삼성, SK, 현대 언급 확인
    for keyword in korean_company_keywords:
        if keyword in title_lower:
            scores["immediacy"] = min(100, scores["immediacy"] + 15)
            scores["scope"] = min(100, scores["scope"] + 10)

    # 산업별 키워드 확인
    for sector, weight in korean_sector_keywords.items():
        if sector.lower() in title_lower:
            scores["scope"] = min(100, scores["scope"] + weight)
            scores["immediacy"] = min(100, scores["immediacy"] + (weight // 2))

    # 높은 영향 키워드
    for keyword in high_impact_keywords:
        if keyword in title_lower:
            scores["immediacy"] = min(100, scores["immediacy"] + 20)
            scores["scalability"] = min(100, scores["scalability"] + 15)

    # 중간 영향 키워드
    for keyword in medium_impact_keywords:
        if keyword in title_lower:
            scores["immediacy"] = min(100, scores["immediacy"] + 10)

    # 카테고리별 가중치 조정
    if category == "경제 정책":
        scores["scope"] = min(100, scores["scope"] + 25)
        scores["context"] = min(100, scores["context"] + 15)
    elif category == "산업 규제":
        scores["scope"] = min(100, scores["scope"] + 20)
        scores["scalability"] = min(100, scores["scalability"] + 15)
    elif category == "국제 관계":
        scores["immediacy"] = min(100, scores["immediacy"] + 25)
        scores["scalability"] = min(100, scores["scalability"] + 20)
    elif category == "기업 공시":
        scores["immediacy"] = min(100, scores["immediacy"] + 20)
    elif category == "기술 혁신":
        scores["scope"] = min(100, scores["scope"] + 15)
        scores["scalability"] = min(100, scores["scalability"] + 10)

    # 5개 기준 평균 계산
    impact_score = sum(scores.values()) / len(scores)

    logger.info(f"한국 영향도: {impact_score:.1f} - {article.get('title', '')[:50]}")
    return round(impact_score, 1)

if __name__ == "__main__":
    test = {
        "title": "Russia cuts gas supply to Europe by 50%",
        "category": "Sanctions & Trade"
    }
    score = calculate_impact_score(test)
    print(f"Impact Score: {score}")
