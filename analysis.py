"""한국 주식 분석 (10 시나리오 + 다단계 스코어링)."""
import logging
from typing import Dict, List
import math

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 10가지 경제 시나리오 기반 수혜/피해 주식 분석 템플릿
SCENARIO_KEYWORDS = {
    "반도체_규제": ["반도체", "칩", "삼성전자", "sk하이닉스", "세메스", "수출제약", "수출규제", "chip", "semiconductor"],
    "에너지_위기": ["에너지", "가스", "유가", "석유", "원유", "LNG", "수급", "oil", "energy"],
    "무역분쟁_관세": ["관세", "무역분쟁", "무역전쟁", "보복", "수출", "수입", "tariff", "trade"],
    "금리_정책": ["금리", "기준금리", "금융통화위원회", "인상", "인하", "정책", "rate", "policy"],
    "방산_수요": ["방위", "방산", "국방", "미사일", "전투기", "군수", "defense", "military"],
    "이차전지_배터리": ["배터리", "이차전지", "전기차", "EV", "에너지저장", "battery", "lithium"],
    "바이오_신약": ["제약", "신약", "임상", "바이오", "의약", "치료제", "pharmaceutical", "biotech"],
    "건설_부동산": ["건설", "부동산", "주택", "부동산", "대형프로젝트", "토목", "construction"],
    "해운_조선": ["해운", "조선", "화물", "선박", "해상운송", "shipping", "maritime"],
    "AI_테크": ["AI", "인공지능", "생성형", "LLM", "자동화", "로봇", "artificial intelligence"],
}

ANALYSIS_TEMPLATES = {
    "반도체_규제": {
        "direct_beneficiaries": [
            {"ticker": "005930.KS", "company": "삼성전자", "sector": "반도체", "base_score": 90},
            {"ticker": "000660.KS", "company": "SK하이닉스", "sector": "반도체", "base_score": 85},
            {"ticker": "006400.KS", "company": "삼성SDS", "sector": "반도체장비", "base_score": 70},
            {"ticker": "091230.KS", "company": "TIGER 반도체", "sector": "ETF", "base_score": 75},
            {"ticker": "445680.KS", "company": "KODEX AI반도체", "sector": "ETF", "base_score": 72},
        ],
        "indirect_beneficiaries": [
            {"ticker": "006800.KS", "company": "미래에셋", "sector": "금융", "base_score": 45},
        ],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "에너지_위기": {
        "direct_beneficiaries": [
            {"ticker": "051910.KS", "company": "LG화학", "sector": "배터리", "base_score": 80},
            {"ticker": "305720.KS", "company": "KODEX 2차전지", "sector": "ETF", "base_score": 75},
        ],
        "indirect_beneficiaries": [
            {"ticker": "012330.KS", "company": "현대차", "sector": "자동차", "base_score": 55},
        ],
        "direct_victims": [
            {"ticker": "047050.KS", "company": "포스코", "sector": "철강", "base_score": -65},
        ],
        "indirect_victims": [
            {"ticker": "010120.KS", "company": "한국전력", "sector": "전력", "base_score": -40},
        ],
    },
    "무역분쟁_관세": {
        "direct_beneficiaries": [
            {"ticker": "012330.KS", "company": "현대차", "sector": "자동차", "base_score": 70},
            {"ticker": "000270.KS", "company": "기아", "sector": "자동차", "base_score": 68},
            {"ticker": "005930.KS", "company": "삼성전자", "sector": "전자", "base_score": 60},
            {"ticker": "091180.KS", "company": "KODEX 자동차", "sector": "ETF", "base_score": 65},
        ],
        "indirect_beneficiaries": [
            {"ticker": "047050.KS", "company": "포스코", "sector": "철강", "base_score": 55},
        ],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "금리_정책": {
        "direct_beneficiaries": [
            {"ticker": "055550.KS", "company": "신한은행", "sector": "금융", "base_score": 85},
            {"ticker": "086790.KS", "company": "KB금융", "sector": "금융", "base_score": 82},
            {"ticker": "000180.KS", "company": "삼성화재", "sector": "보험", "base_score": 75},
            {"ticker": "152100.KS", "company": "TIGER 은행", "sector": "ETF", "base_score": 70},
            {"ticker": "161510.KS", "company": "TIGER 고배당", "sector": "ETF", "base_score": 68},
        ],
        "indirect_beneficiaries": [],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "방산_수요": {
        "direct_beneficiaries": [
            {"ticker": "012450.KS", "company": "한화에어로스페이스", "sector": "방산", "base_score": 88},
            {"ticker": "000880.KS", "company": "한화", "sector": "방산", "base_score": 82},
            {"ticker": "457690.KS", "company": "TIGER K방산", "sector": "ETF", "base_score": 80},
        ],
        "indirect_beneficiaries": [
            {"ticker": "047050.KS", "company": "포스코", "sector": "철강", "base_score": 60},
        ],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "이차전지_배터리": {
        "direct_beneficiaries": [
            {"ticker": "051910.KS", "company": "LG화학", "sector": "배터리", "base_score": 88},
            {"ticker": "066570.KS", "company": "LG에너지솔루션", "sector": "배터리", "base_score": 85},
            {"ticker": "305720.KS", "company": "KODEX 2차전지", "sector": "ETF", "base_score": 80},
            {"ticker": "012330.KS", "company": "현대차", "sector": "자동차", "base_score": 65},
        ],
        "indirect_beneficiaries": [],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "바이오_신약": {
        "direct_beneficiaries": [
            {"ticker": "068270.KS", "company": "셀트리온", "sector": "바이오", "base_score": 85},
            {"ticker": "207940.KS", "company": "삼성바이오로직스", "sector": "바이오", "base_score": 82},
            {"ticker": "143860.KS", "company": "KODEX 바이오", "sector": "ETF", "base_score": 75},
        ],
        "indirect_beneficiaries": [],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "건설_부동산": {
        "direct_beneficiaries": [
            {"ticker": "047050.KS", "company": "포스코", "sector": "건설", "base_score": 70},
            {"ticker": "000720.KS", "company": "현대건설", "sector": "건설", "base_score": 68},
        ],
        "indirect_beneficiaries": [
            {"ticker": "012330.KS", "company": "현대차", "sector": "자동차", "base_score": 45},
        ],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "해운_조선": {
        "direct_beneficiaries": [
            {"ticker": "009540.KS", "company": "현대중공업", "sector": "조선", "base_score": 82},
            {"ticker": "010140.KS", "company": "삼성중공업", "sector": "조선", "base_score": 78},
        ],
        "indirect_beneficiaries": [],
        "direct_victims": [],
        "indirect_victims": [],
    },
    "AI_테크": {
        "direct_beneficiaries": [
            {"ticker": "035420.KS", "company": "NAVER", "sector": "IT", "base_score": 85},
            {"ticker": "035720.KS", "company": "카카오", "sector": "IT", "base_score": 80},
            {"ticker": "441800.KS", "company": "TIGER AI&로봇", "sector": "ETF", "base_score": 78},
            {"ticker": "445680.KS", "company": "KODEX AI반도체", "sector": "ETF", "base_score": 75},
        ],
        "indirect_beneficiaries": [
            {"ticker": "005930.KS", "company": "삼성전자", "sector": "반도체", "base_score": 55},
        ],
        "direct_victims": [],
        "indirect_victims": [],
    },
}

def detect_scenario(title: str) -> str:
    """뉴스 제목에서 시나리오 감지."""
    title_lower = title.lower()

    for scenario, keywords in SCENARIO_KEYWORDS.items():
        if any(keyword in title_lower for keyword in keywords):
            return scenario

    return "금리_정책"  # 기본값

def calculate_impact_score(base_score: int, article_impact: int = 70) -> int:
    """종목별 임팩트 스코어 계산 (0-100)."""
    # base_score (종목 특성) 40% + article_impact (뉴스 영향도) 60%
    weighted_score = (base_score * 0.4) + (article_impact * 0.6)
    return min(100, max(0, int(weighted_score)))

def calculate_expected_change(impact_score: int, direction: int = 1) -> str:
    """임팩트 스코어를 예상 변동률로 변환."""
    # direction: 1=상승, -1=하락
    magnitude = abs(impact_score) / 100.0
    change = magnitude * 5.0  # 최대 ±5%
    sign = "+" if direction > 0 else ""
    return f"{sign}{change:.1f}%"

def analyze_stocks(article: Dict) -> Dict:
    """한국 뉴스를 기반으로 다단계 스코어링 분석."""

    title = article.get("title", "")
    impact_score = article.get("impact_score", 70)

    # 시나리오 감지
    scenario = detect_scenario(title)
    template = ANALYSIS_TEMPLATES.get(scenario, ANALYSIS_TEMPLATES["금리_정책"])

    # 결과 구성
    result = {
        "analysis_type": scenario,
        "direct_beneficiaries": [],
        "indirect_beneficiaries": [],
        "direct_victims": [],
        "indirect_victims": [],
    }

    # 직접 수혜주
    for stock in template.get("direct_beneficiaries", []):
        final_score = calculate_impact_score(stock["base_score"], impact_score)
        result["direct_beneficiaries"].append({
            "ticker": stock["ticker"],
            "company": stock["company"],
            "sector": stock["sector"],
            "expected_change": calculate_expected_change(final_score, 1),
            "impact_score": final_score,
            "reason": f"{scenario} 시나리오에서 직접 수혜",
        })

    # 간접 수혜주
    for stock in template.get("indirect_beneficiaries", []):
        final_score = calculate_impact_score(stock["base_score"], impact_score)
        result["indirect_beneficiaries"].append({
            "ticker": stock["ticker"],
            "company": stock["company"],
            "sector": stock["sector"],
            "expected_change": calculate_expected_change(final_score, 1),
            "impact_score": final_score,
            "reason": f"{scenario} 시나리오에서 간접 수혜",
        })

    # 직접 피해주
    for stock in template.get("direct_victims", []):
        final_score = abs(calculate_impact_score(stock["base_score"], impact_score))
        result["direct_victims"].append({
            "ticker": stock["ticker"],
            "company": stock["company"],
            "sector": stock["sector"],
            "expected_change": calculate_expected_change(final_score, -1),
            "impact_score": -final_score,
            "reason": f"{scenario} 시나리오에서 직접 피해",
        })

    # 간접 피해주
    for stock in template.get("indirect_victims", []):
        final_score = abs(calculate_impact_score(stock["base_score"], impact_score))
        result["indirect_victims"].append({
            "ticker": stock["ticker"],
            "company": stock["company"],
            "sector": stock["sector"],
            "expected_change": calculate_expected_change(final_score, -1),
            "impact_score": -final_score,
            "reason": f"{scenario} 시나리오에서 간접 피해",
        })

    logger.info(f"분석: {scenario} (impact_score={impact_score}): {title[:50]}")
    return result

if __name__ == "__main__":
    test_articles = [
        {"title": "삼성전자 반도체 수출 제약 해제", "impact_score": 82},
        {"title": "한국은행, 기준금리 인상 검토", "impact_score": 88},
        {"title": "방위사업청, 미사일 발주 증가", "impact_score": 75},
        {"title": "LG화학, 배터리 생산 확대", "impact_score": 70},
    ]

    for article in test_articles:
        analysis = analyze_stocks(article)
        print(f"\n시나리오: {analysis['analysis_type']}")
        print(f"직접 수혜주: {len(analysis['direct_beneficiaries'])}")
        for stock in analysis["direct_beneficiaries"][:2]:
            print(f"  - {stock['company']}: {stock['expected_change']}")
