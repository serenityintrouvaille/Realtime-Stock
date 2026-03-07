export async function GET() {
  // 한국 주식 데이터 (80%) + 글로벌 비교 (20%)
  const stocksData = [
    // 한국 대형주
    { "ticker": "005930.KS", "price": 73500, "change": 2.45, "momentum_20d": 8.50 },
    { "ticker": "000660.KS", "price": 145200, "change": 3.20, "momentum_20d": 12.30 },
    { "ticker": "035420.KS", "price": 185300, "change": 1.85, "momentum_20d": 5.40 },
    { "ticker": "035720.KS", "price": 112400, "change": -1.50, "momentum_20d": -3.20 },
    { "ticker": "051910.KS", "price": 785200, "change": 2.10, "momentum_20d": 7.60 },
    { "ticker": "000810.KS", "price": 97600, "change": 1.20, "momentum_20d": 4.30 },
    { "ticker": "012330.KS", "price": 232500, "change": 2.85, "momentum_20d": 9.10 },
    { "ticker": "005380.KS", "price": 168900, "change": 1.95, "momentum_20d": 6.50 },
    { "ticker": "006400.KS", "price": 65800, "change": 3.15, "momentum_20d": 10.80 },
    { "ticker": "034020.KS", "price": 156200, "change": 1.40, "momentum_20d": 3.90 },
    { "ticker": "047050.KS", "price": 68300, "change": -2.10, "momentum_20d": -5.40 },
    { "ticker": "010120.KS", "price": 28450, "change": 0.85, "momentum_20d": 2.10 },
    { "ticker": "055550.KS", "price": 41250, "change": 1.65, "momentum_20d": 4.80 },
    { "ticker": "086790.KS", "price": 58600, "change": 1.35, "momentum_20d": 3.70 },
    { "ticker": "000180.KS", "price": 135800, "change": 2.20, "momentum_20d": 7.20 },
    { "ticker": "016360.KS", "price": 189600, "change": 2.65, "momentum_20d": 8.40 },
    { "ticker": "030200.KS", "price": 18350, "change": -0.95, "momentum_20d": -1.80 },
    { "ticker": "032640.KS", "price": 12680, "change": 0.65, "momentum_20d": 1.50 },
    { "ticker": "011210.KS", "price": 46200, "change": 1.55, "momentum_20d": 5.10 },
    { "ticker": "028670.KS", "price": 78900, "change": 2.35, "momentum_20d": 6.90 },
    { "ticker": "069500.KS", "price": 34560, "change": 2.10, "momentum_20d": 6.80 },
    { "ticker": "102110.KS", "price": 32890, "change": 1.95, "momentum_20d": 5.90 },
    { "ticker": "233160.KS", "price": 28450, "change": 1.85, "momentum_20d": 5.40 },
    { "ticker": "000270.KS", "price": 78200, "change": 2.15, "momentum_20d": 7.10 },
    { "ticker": "036570.KS", "price": 125600, "change": 3.10, "momentum_20d": 11.20 },
    { "ticker": "039440.KS", "price": 19850, "change": -1.20, "momentum_20d": -2.90 },
    { "ticker": "047810.KS", "price": 52300, "change": 1.75, "momentum_20d": 5.60 },
    { "ticker": "005870.KS", "price": 31200, "change": -1.85, "momentum_20d": -3.40 },
    { "ticker": "011700.KS", "price": 62400, "change": 1.45, "momentum_20d": 4.70 },
    { "ticker": "001390.KS", "price": 89300, "change": 2.30, "momentum_20d": 7.50 },
    { "ticker": "001460.KS", "price": 78600, "change": 1.95, "momentum_20d": 6.20 },
    { "ticker": "071840.KS", "price": 42100, "change": 0.95, "momentum_20d": 2.80 },
    { "ticker": "036460.KS", "price": 105200, "change": 1.65, "momentum_20d": 4.90 },
    { "ticker": "^KS11", "price": 2856.42, "change": 1.85, "momentum_20d": 6.30 },
    { "ticker": "^KQ150", "price": 1045.82, "change": 0.95, "momentum_20d": 2.10 },
    // 한국 ETF - 지수
    { "ticker": "069500.KS", "price": 34560, "change": 1.95, "momentum_20d": 6.20, "name": "KODEX 200" },
    { "ticker": "102110.KS", "price": 32890, "change": 1.85, "momentum_20d": 5.90, "name": "TIGER 200" },
    { "ticker": "229200.KS", "price": 18450, "change": 0.95, "momentum_20d": 2.10, "name": "KODEX KOSDAQ150" },
    // 한국 ETF - 섹터 (반도체)
    { "ticker": "091230.KS", "price": 42500, "change": 3.15, "momentum_20d": 11.20, "name": "TIGER 반도체" },
    // 한국 ETF - 섹터 (배터리/에너지)
    { "ticker": "305720.KS", "price": 28900, "change": 2.55, "momentum_20d": 8.60, "name": "KODEX 2차전지" },
    // 한국 ETF - 섹터 (방산)
    { "ticker": "457690.KS", "price": 19250, "change": 2.85, "momentum_20d": 9.40, "name": "TIGER K방산" },
    // 한국 ETF - 섹터 (자동차)
    { "ticker": "091180.KS", "price": 25600, "change": 1.45, "momentum_20d": 4.80, "name": "KODEX 자동차" },
    // 한국 ETF - 배당
    { "ticker": "161510.KS", "price": 38200, "change": 2.10, "momentum_20d": 6.80, "name": "TIGER 고배당" },
    { "ticker": "211560.KS", "price": 22450, "change": 1.65, "momentum_20d": 5.20, "name": "KODEX 배당성장" },
    // 한국 ETF - 글로벌 연계
    { "ticker": "379800.KS", "price": 32150, "change": 2.45, "momentum_20d": 7.50, "name": "KODEX 미국S&P500" },
    { "ticker": "133690.KS", "price": 28600, "change": 3.25, "momentum_20d": 12.10, "name": "TIGER 미국나스닥100" },
    // 한국 ETF - 채권/혼합
    { "ticker": "114820.KS", "price": 10450, "change": 0.45, "momentum_20d": 1.20, "name": "KODEX 국채3년" },
    // 한국 ETF - AI/기술
    { "ticker": "441800.KS", "price": 35800, "change": 2.75, "momentum_20d": 9.80, "name": "TIGER AI&로봇" },
    { "ticker": "445680.KS", "price": 31200, "change": 3.10, "momentum_20d": 10.60, "name": "KODEX AI반도체" },
    // 한국 ETF - 추가 섹터
    { "ticker": "152100.KS", "price": 24500, "change": 1.85, "momentum_20d": 5.40, "name": "TIGER 은행" },
    { "ticker": "143860.KS", "price": 18900, "change": 2.35, "momentum_20d": 7.10, "name": "KODEX 바이오" },
    // 글로벌 (비교용)
    { "ticker": "AAPL", "price": 185.42, "change": 2.15, "momentum_20d": 5.32 },
    { "ticker": "MSFT", "price": 378.91, "change": 1.85, "momentum_20d": 4.20 },
    { "ticker": "TSM", "price": 118.92, "change": 3.15, "momentum_20d": 9.20 },
    { "ticker": "0700.HK", "price": 118.45, "change": 1.95, "momentum_20d": 4.50 },
    { "ticker": "9988.HK", "price": 94.23, "change": -0.85, "momentum_20d": -1.20 },
    { "ticker": "NVDA", "price": 892.45, "change": 3.42, "momentum_20d": 12.50 }
  ];

  return new Response(JSON.stringify(stocksData), {
    headers: { 'Content-Type': 'application/json' },
  });
}
