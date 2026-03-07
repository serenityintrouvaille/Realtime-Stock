export async function GET() {
  // 한국 시장 중심 뉴스 데이터
  const newsData = [
    {
      "id": "yna_001",
      "title": "삼성전자, 반도체 수출 제약 해제... 주가 2.45% 상승",
      "summary": "삼성전자가 미국의 반도체 수출 제약 해제 소식에 호재로 작용하면서 장중 2.45% 상승했다. 업계 전문가는 삼성이 글로벌 메모리 반도체 시장 회복세를 기대하고 있다고 분석했다.",
      "source": "연합뉴스",
      "country": "Korea",
      "region": "아시아",
      "url": "https://yonhapnews.co.kr",
      "timestamp": "2026-03-08T14:30:00Z",
      "category": "산업 규제",
      "impact_score": 82,
      "category_confidence": 0.94,
      "beneficiaries": {
        "direct": [
          {"ticker": "005930.KS", "company": "삼성전자", "expected_change": "+3.5%", "reason": "반도체 규제 해제로 글로벌 판매 확대"},
          {"ticker": "000660.KS", "company": "SK하이닉스", "expected_change": "+2.8%", "reason": "메모리 칩 수출 제약 완화"},
          {"ticker": "091230.KS", "company": "TIGER 반도체", "expected_change": "+2.5%", "reason": "반도체 섹터 전반 호재"}
        ],
        "indirect": [
          {"ticker": "006400.KS", "company": "삼성SDS", "expected_change": "+1.8%", "reason": "반도체 장비 수요 증가"}
        ],
        "victims": []
      }
    },
    {
      "id": "mk_002",
      "title": "한국 기준금리 인상 검토... 금융주 일제히 상승",
      "summary": "한국은행이 기준금리 인상을 검토하면서 신한은행, KB금융 등 금융주들이 일제히 상승했다. 시장 전문가들은 금리 인상이 금융마진 확대로 이어질 것으로 예상하고 있다.",
      "source": "매경이코노미",
      "country": "Korea",
      "region": "아시아",
      "url": "https://mk.co.kr",
      "timestamp": "2026-03-08T13:45:00Z",
      "category": "경제 정책",
      "impact_score": 88,
      "category_confidence": 0.96,
      "beneficiaries": {
        "direct": [
          {"ticker": "055550.KS", "company": "신한은행", "expected_change": "+4.2%", "reason": "금리 인상으로 순이자마진 확대"},
          {"ticker": "086790.KS", "company": "KB금융", "expected_change": "+3.8%", "reason": "금융마진 개선 수혜"},
          {"ticker": "000180.KS", "company": "삼성화재", "expected_change": "+2.1%", "reason": "금리 인상에 따른 보험마진 개선"}
        ],
        "indirect": [
          {"ticker": "161510.KS", "company": "TIGER 고배당", "expected_change": "+1.5%", "reason": "배당성장 수익성 개선"}
        ],
        "victims": []
      }
    },
    {
      "id": "hn_003",
      "title": "미국-중국 무역분쟁 심화... 현대차·기아 수출 우려",
      "summary": "미국의 중국산 전자제품 관세 인상에 중국이 보복 관세로 대응하면서 한국 자동차 업체들의 수출 전망이 어두워지고 있다. 현대차와 기아는 중국 시장에서 큰 영향을 받을 수 있다는 분석이 나왔다.",
      "source": "한국경제",
      "country": "Korea",
      "region": "아시아",
      "url": "https://hankyung.com",
      "timestamp": "2026-03-08T12:20:00Z",
      "category": "국제 관계",
      "impact_score": 78,
      "category_confidence": 0.91,
      "beneficiaries": {
        "direct": [],
        "indirect": [],
        "victims": [
          {"ticker": "012330.KS", "company": "현대차", "expected_change": "-2.5%", "reason": "중국 시장 수출 부진"},
          {"ticker": "000270.KS", "company": "기아", "expected_change": "-2.3%", "reason": "중국 판매량 감소 우려"},
          {"ticker": "091180.KS", "company": "KODEX 자동차", "expected_change": "-1.8%", "reason": "자동차 섹터 악화"}
        ]
      }
    },
    {
      "id": "mt_004",
      "title": "포스코, 강철 수요 증가로 1분기 실적 호조 전망",
      "summary": "글로벌 건설 경기 회복으로 강철 수요가 증가하면서 포스코의 1분기 실적이 호조를 보일 것으로 예상된다. 회사 측은 평균 판가 상승이 수익성을 개선할 것으로 전망하고 있다.",
      "source": "머니투데이",
      "country": "Korea",
      "region": "아시아",
      "url": "https://moneytoday.co.kr",
      "timestamp": "2026-03-08T11:15:00Z",
      "category": "기업 공시",
      "impact_score": 71,
      "category_confidence": 0.87,
      "beneficiaries": {
        "direct": [
          {"ticker": "005490.KS", "company": "포스코", "expected_change": "+2.1%", "reason": "강철 수요 증가로 실적 개선"}
        ],
        "indirect": [],
        "victims": []
      }
    },
    {
      "id": "edaily_005",
      "title": "Naver, AI 기술 혁신으로 검색광고 경쟁력 강화",
      "summary": "Naver가 생성형 AI를 검색 서비스에 접목하면서 글로벌 검색 시장에서의 경쟁력을 강화하고 있다. 업계 관계자는 이번 기술 혁신이 광고 수익 증대로 이어질 것으로 기대하고 있다.",
      "source": "이데일리",
      "country": "Korea",
      "region": "아시아",
      "url": "https://edaily.co.kr",
      "timestamp": "2026-03-08T10:45:00Z",
      "category": "기술 혁신",
      "impact_score": 74,
      "category_confidence": 0.89,
      "beneficiaries": {
        "direct": [
          {"ticker": "035420.KS", "company": "NAVER", "expected_change": "+2.2%", "reason": "AI 기술 혁신으로 광고 경쟁력 강화"},
          {"ticker": "441800.KS", "company": "TIGER AI&로봇", "expected_change": "+1.8%", "reason": "AI 기술 트렌드 상승"}
        ],
        "indirect": [],
        "victims": []
      }
    },
    {
      "id": "newsis_006",
      "title": "LG디스플레이, OLED TV 수요 회복으로 실적 개선",
      "summary": "LG디스플레이가 OLED TV 시장의 수요 회복으로 분기 실적 개선을 기대하고 있다. 프리미엄 디스플레이 부문의 마진율 개선이 주요 수익 요소가 될 것으로 예상된다.",
      "source": "뉴시스",
      "country": "Korea",
      "region": "아시아",
      "url": "https://newsis.com",
      "timestamp": "2026-03-08T09:30:00Z",
      "category": "산업 규제",
      "impact_score": 68,
      "category_confidence": 0.85,
      "beneficiaries": {
        "direct": [{"ticker": "034220.KS", "company": "LG디스플레이", "expected_change": "+1.9%", "reason": "OLED TV 수요 회복"}],
        "indirect": [],
        "victims": []
      }
    },
    {
      "id": "herald_007",
      "title": "SK하이닉스, 글로벌 메모리칩 가격 회복 기대",
      "summary": "SK하이닉스가 2026년 상반기 DRAM, NAND 가격 회복을 기대하고 있다. 업계 수급 개선으로 메모리칩 실적 반등이 본격화될 것으로 전망된다.",
      "source": "헤럴드경제",
      "country": "Korea",
      "region": "아시아",
      "url": "https://heraldbiz.com",
      "timestamp": "2026-03-08T08:45:00Z",
      "category": "경제 정책",
      "impact_score": 85,
      "category_confidence": 0.93,
      "beneficiaries": {
        "direct": [
          {"ticker": "000660.KS", "company": "SK하이닉스", "expected_change": "+3.2%", "reason": "메모리칩 가격 회복"},
          {"ticker": "091230.KS", "company": "TIGER 반도체", "expected_change": "+2.8%", "reason": "반도체 섹터 호재"}
        ],
        "indirect": [],
        "victims": []
      }
    },
    {
      "id": "fn_008",
      "title": "카카오, 신사업 다각화로 수익성 강화 전략",
      "summary": "카카오가 핀테크, AI, 로보틱스 등 신사업 분야로 확장하면서 수익성 강화에 나서고 있다. 플랫폼 강점을 활용한 생태계 확대가 주목되고 있다.",
      "source": "파이낸셜뉴스",
      "country": "Korea",
      "region": "아시아",
      "url": "https://fnnews.com",
      "timestamp": "2026-03-08T07:50:00Z",
      "category": "기술 혁신",
      "impact_score": 69,
      "category_confidence": 0.83,
      "beneficiaries": {
        "direct": [{"ticker": "035720.KS", "company": "카카오", "expected_change": "+1.7%", "reason": "신사업 다각화로 수익성 강화"}],
        "indirect": [],
        "victims": []
      }
    },
    {
      "id": "sedaily_009",
      "title": "현대차, 전기자동차 생산 확대로 탄소중립 목표 추진",
      "summary": "현대차가 전기자동차 생산 목표를 상향조정하면서 2050 탄소중립 목표를 적극 추진 중이다. 정부 지원정책 확대로 전기차 시장 성장이 가속화될 전망이다.",
      "source": "서울경제",
      "country": "Korea",
      "region": "아시아",
      "url": "https://sedaily.com",
      "timestamp": "2026-03-08T07:00:00Z",
      "category": "정책",
      "impact_score": 76,
      "category_confidence": 0.90,
      "beneficiaries": {
        "direct": [
          {"ticker": "012330.KS", "company": "현대차", "expected_change": "+1.8%", "reason": "전기차 생산 확대 호재"},
          {"ticker": "305720.KS", "company": "KODEX 2차전지", "expected_change": "+2.1%", "reason": "EV 배터리 수요 증가"}
        ],
        "indirect": [],
        "victims": []
      }
    },
    {
      "id": "bloomberg_010",
      "title": "US Fed, 금리 인상 일시 중단 신호... 글로벌 증시 상승",
      "summary": "미 연방준비제도가 금리 인상 일시 중단을 신호하면서 글로벌 증시가 일제히 상승했다. 한국 KOSPI도 외국인 매수세를 바탕으로 상승률을 높이고 있다.",
      "source": "Bloomberg",
      "country": "US",
      "region": "아메리카",
      "url": "https://bloomberg.com",
      "timestamp": "2026-03-08T06:30:00Z",
      "category": "경제 정책",
      "impact_score": 72,
      "category_confidence": 0.88,
      "beneficiaries": {
        "direct": [
          {"ticker": "005930.KS", "company": "삼성전자", "expected_change": "+1.5%", "reason": "글로벌 증시 상승 수혜"}
        ],
        "indirect": [],
        "victims": []
      }
    }
  ];

  return new Response(JSON.stringify(newsData), {
    headers: { 'Content-Type': 'application/json' },
  });
}
