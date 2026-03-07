"""Stock analysis for each news (4 types: direct/indirect beneficiaries & victims)."""
import logging
from typing import Dict, List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Pre-defined analysis templates for different news types
ANALYSIS_TEMPLATES = {
    "energy_crisis": {
        "direct_beneficiaries": [
            {"ticker": "SKI", "company": "SK Innovation", "change": "+15%", "reason": "LNG 사업 수혜"},
            {"ticker": "KNOC", "company": "한국석유공사", "change": "+12%", "reason": "에너지 가격 상승"},
            {"ticker": "RWE", "company": "RWE (독일)", "change": "+18%", "reason": "재계약 단가 상향"},
        ],
        "indirect_beneficiaries": [
            {"ticker": "SOLAR", "company": "태양광 기업", "change": "+8%", "reason": "신재생에너지 전환"},
            {"ticker": "BATTERY", "company": "배터리 제조", "change": "+6%", "reason": "에너지 저장 수요"},
        ],
        "direct_victims": [
            {"ticker": "CHEM", "company": "화학사", "change": "-12%", "reason": "천연가스 원료 비용 상승"},
            {"ticker": "ALUM", "company": "알루미늄 제조", "change": "-10%", "reason": "에너지 비용 급증"},
        ],
        "indirect_victims": [
            {"ticker": "AIR", "company": "항공사", "change": "-8%", "reason": "유가 상승 → 연료비 증가"},
            {"ticker": "TRANSPORT", "company": "운송사", "change": "-6%", "reason": "물류비 상승"},
        ],
    },
    "war_conflict": {
        "direct_beneficiaries": [
            {"ticker": "KAI", "company": "한국항공우주", "change": "+25%", "reason": "방위산업 수혜"},
            {"ticker": "HDC", "company": "현대로템", "change": "+20%", "reason": "방위산업 수혜"},
        ],
        "indirect_beneficiaries": [
            {"ticker": "GOLD", "company": "금 관련주", "change": "+12%", "reason": "안전자산 선호"},
            {"ticker": "BOND", "company": "채권 (금리 하락)", "change": "+8%", "reason": "위험회피"},
        ],
        "direct_victims": [
            {"ticker": "TOURISM", "company": "관광사", "change": "-20%", "reason": "여행 수요 급감"},
            {"ticker": "EXPORT", "company": "수출 제조업", "change": "-15%", "reason": "공급망 차질"},
        ],
        "indirect_victims": [
            {"ticker": "GROWTH", "company": "성장주 전반", "change": "-10%", "reason": "경제 둔화 우려"},
        ],
    },
    "tariff_trade": {
        "direct_beneficiaries": [
            {"ticker": "LOCAL", "company": "국내 제조업", "change": "+10%", "reason": "수입 제품 경쟁력 약화"},
        ],
        "indirect_beneficiaries": [
            {"ticker": "IMPORT_ALT", "company": "수입 대체 기업", "change": "+8%", "reason": "국내 수요 전환"},
        ],
        "direct_victims": [
            {"ticker": "EXPORT", "company": "수출 기업", "change": "-15%", "reason": "보복 관세 우려"},
            {"ticker": "SEMI", "company": "반도체", "change": "-12%", "reason": "부품 수출 차질"},
        ],
        "indirect_victims": [
            {"ticker": "CONSUMER", "company": "소비재", "change": "-8%", "reason": "수입품 가격 상승"},
        ],
    },
}

def analyze_stocks(article: Dict) -> Dict:
    """Analyze stocks based on news type and generate beneficiaries/victims."""

    title_lower = article.get("title", "").lower()

    # Detect news type
    template_key = "tariff_trade"  # default

    if any(word in title_lower for word in ["war", "conflict", "attack", "military"]):
        template_key = "war_conflict"
    elif any(word in title_lower for word in ["gas", "oil", "energy", "fuel", "supply"]):
        template_key = "energy_crisis"
    elif any(word in title_lower for word in ["tariff", "trade", "import", "export"]):
        template_key = "tariff_trade"

    template = ANALYSIS_TEMPLATES.get(template_key, ANALYSIS_TEMPLATES["tariff_trade"])

    result = {
        "analysis_type": template_key,
        "direct_beneficiaries": template["direct_beneficiaries"],
        "indirect_beneficiaries": template["indirect_beneficiaries"],
        "direct_victims": template["direct_victims"],
        "indirect_victims": template["indirect_victims"],
    }

    logger.info(f"Analyzed {template_key}: {article['title'][:50]}")
    return result

if __name__ == "__main__":
    test = {"title": "Russia cuts gas supply to Europe"}
    analysis = analyze_stocks(test)
    print(f"Type: {analysis['analysis_type']}")
    print(f"Direct Beneficiaries: {len(analysis['direct_beneficiaries'])} stocks")
    for stock in analysis["direct_beneficiaries"]:
        print(f"  - {stock['company']}: {stock['change']}")
