'use client';

import React, { useState, useEffect } from 'react';

const tabs = [
  { id: 'research', label: '리서치 피드', icon: '📰' },
  { id: 'beneficiaries', label: '수혜주', icon: '🚀' },
  { id: 'losers', label: '손실주', icon: '📉' },
  { id: 'sector', label: '섹터 분석', icon: '📊' },
  { id: 'portfolio', label: '포트폴리오', icon: '💼' },
  { id: 'etf', label: 'ETF', icon: '📈' },
  { id: 'settings', label: '설정', icon: '⚙️' },
];

const SECTOR_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  '반도체': { bg: 'from-blue-600/10 to-blue-500/5', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-500' },
  '금융': { bg: 'from-green-600/10 to-green-500/5', text: 'text-green-400', border: 'border-green-500/30', dot: 'bg-green-500' },
  '자동차': { bg: 'from-orange-600/10 to-orange-500/5', text: 'text-orange-400', border: 'border-orange-500/30', dot: 'bg-orange-500' },
  '에너지': { bg: 'from-red-600/10 to-red-500/5', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-500' },
  '기술': { bg: 'from-purple-600/10 to-purple-500/5', text: 'text-purple-400', border: 'border-purple-500/30', dot: 'bg-purple-500' },
  '배터리': { bg: 'from-yellow-600/10 to-yellow-500/5', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: 'bg-yellow-500' },
  '방산': { bg: 'from-rose-600/10 to-rose-500/5', text: 'text-rose-400', border: 'border-rose-500/30', dot: 'bg-rose-500' },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('research');
  const [news, setNews] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [newsRes, stocksRes] = await Promise.all([
        fetch('/api/news').catch(() => null),
        fetch('/api/stocks').catch(() => null),
      ]);

      if (newsRes?.ok) setNews((await newsRes.json()).slice(0, 20));
      if (stocksRes?.ok) setStocks((await stocksRes.json()).slice(0, 80));
      setLastUpdate(new Date().toLocaleTimeString('ko-KR'));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const kospi = stocks.find((s: any) => s.ticker === '^KS11') as any;
  const kosdaq = stocks.find((s: any) => s.ticker === '^KQ150') as any;

  const renderContent = () => {
    switch (activeTab) {
      case 'research': return <ResearchTab news={news} />;
      case 'beneficiaries': return <BeneficiariesTab news={news} />;
      case 'losers': return <LosersTab stocks={stocks} />;
      case 'sector': return <SectorTab news={news} />;
      case 'portfolio': return <PortfolioTab stocks={stocks} />;
      case 'etf': return <ETFTab stocks={stocks} />;
      case 'settings': return <SettingsTab />;
      default: return <ResearchTab news={news} />;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'>
      {/* 헤더 */}
      <header className='sticky top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6'>
          {/* 제목 & 인덱스 */}
          <div className='flex justify-between items-start mb-6'>
            <div>
              <h1 className='text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                한국 주식 분석기
              </h1>
              <p className='text-slate-400 text-sm mt-2'>실시간 시장 분석 • AI 기반 수혜주 발굴</p>
            </div>

            {/* KOSPI/KOSDAQ 실시간 */}
            <div className='flex gap-4'>
              {kospi && (
                <div className='bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-blue-500/20 rounded-xl p-4 backdrop-blur'>
                  <div className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>KOSPI</div>
                  <div className='text-2xl font-bold text-white mt-1'>{kospi.price.toLocaleString()}</div>
                  <div className={`text-sm font-semibold mt-2 ${kospi.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {kospi.change > 0 ? '▲' : '▼'} {Math.abs(kospi.change).toFixed(2)}%
                  </div>
                </div>
              )}
              {kosdaq && (
                <div className='bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-purple-500/20 rounded-xl p-4 backdrop-blur'>
                  <div className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>KOSDAQ</div>
                  <div className='text-2xl font-bold text-white mt-1'>{kosdaq.price.toLocaleString()}</div>
                  <div className={`text-sm font-semibold mt-2 ${kosdaq.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {kosdaq.change > 0 ? '▲' : '▼'} {Math.abs(kosdaq.change).toFixed(2)}%
                  </div>
                </div>
              )}
              <div className='bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur'>
                <div className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>업데이트</div>
                <div className='text-sm text-white mt-1 font-mono'>{lastUpdate}</div>
                <button
                  onClick={fetchData}
                  className='mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition'
                >
                  새로고침
                </button>
              </div>
            </div>
          </div>

          {/* 탭 */}
          <div className='flex gap-2 overflow-x-auto pb-2 -mx-4 px-4'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 컨텐츠 */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        {renderContent()}
      </main>

      {/* 푸터 */}
      <footer className='mt-16 py-8 border-t border-slate-800/50 text-center text-slate-500 text-sm'>
        <p>한국 주식 분석기 v2.0 • Powered by Claude AI + Next.js</p>
      </footer>
    </div>
  );
}

function ResearchTab({ news }: { news: any[] }) {
  if (!news.length) return <div className='text-center py-12 text-slate-400'>데이터 로딩 중...</div>;

  return (
    <div className='space-y-4'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-2'>📰 리서치 피드</h2>
        <p className='text-slate-400'>최신 시장 뉴스 및 영향도 분석</p>
      </div>

      {news.map((article, idx) => (
        <div
          key={idx}
          className='group relative bg-gradient-to-r from-slate-800/40 to-slate-800/20 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-6 transition duration-300 overflow-hidden'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition' />

          <div className='relative'>
            <div className='flex justify-between items-start gap-4 mb-3'>
              <div>
                <div className='flex gap-2 items-center mb-2'>
                  <span className='px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded'>
                    {article.category || '분석'}
                  </span>
                  <span className='text-xs text-slate-500'>{article.source}</span>
                </div>
                <h3 className='text-lg font-bold text-white group-hover:text-blue-300 transition'>
                  {article.title}
                </h3>
              </div>
              <div className='flex-shrink-0 text-right'>
                <div className='text-3xl font-black text-amber-400'>{article.impact_score}</div>
                <div className='text-xs text-slate-500'>영향도</div>
              </div>
            </div>

            <p className='text-sm text-slate-300 mb-4'>{article.summary}</p>

            {article.beneficiaries?.direct?.length > 0 && (
              <div className='mt-4 pt-4 border-t border-slate-700/50'>
                <p className='text-xs text-slate-400 font-semibold mb-2'>💡 주요 수혜주</p>
                <div className='flex flex-wrap gap-2'>
                  {article.beneficiaries.direct.slice(0, 3).map((s: any, i: number) => (
                    <span key={i} className='px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded'>
                      {s.company} {s.expected_change}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function BeneficiariesTab({ news }: { news: any[] }) {
  const beneficiaries: Record<string, any> = {};

  news.forEach(article => {
    article.beneficiaries?.direct?.forEach((s: any) => {
      if (!beneficiaries[s.ticker]) {
        beneficiaries[s.ticker] = { ...s, count: 0, reasons: [] };
      }
      beneficiaries[s.ticker].count++;
      beneficiaries[s.ticker].reasons.push(article.title.substring(0, 40));
    });
  });

  const sorted = Object.values(beneficiaries).sort((a, b) => b.count - a.count).slice(0, 12);

  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>🚀 주요 수혜주</h2>
      <p className='text-slate-400 mb-6'>최근 뉴스에서 가장 많이 언급된 수혜주 (최신 뉴스 기반)</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sorted.map((stock, idx) => {
          const colors = SECTOR_COLORS[stock.sector] || SECTOR_COLORS['기술'];
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-6 hover:border-blue-400/50 transition group`}
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <div className={`text-2xl font-bold ${colors.text}`}>{stock.ticker}</div>
                  <div className='text-sm text-slate-400'>{stock.company}</div>
                </div>
                <div className={`px-2 py-1 rounded-full ${colors.dot} opacity-50 w-3 h-3`} />
              </div>

              <div className='bg-black/20 rounded-lg p-3 mb-3'>
                <div className='text-xs text-slate-400 mb-1'>예상 변동</div>
                <div className={`text-xl font-bold ${stock.expected_change.includes('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.expected_change}
                </div>
              </div>

              <div className='text-xs text-slate-400'>
                <p className='font-semibold mb-2'>관련 뉴스 {stock.count}건</p>
                <p className='line-clamp-2'>{stock.reasons[0]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LosersTab({ stocks }: { stocks: any[] }) {
  const losers = stocks.filter((s: any) => s.change < 0).sort((a, b) => a.change - b.change).slice(0, 12);

  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>📉 손실주</h2>
      <p className='text-slate-400 mb-6'>오늘의 최고 하락 종목</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {losers.map((stock, idx) => (
          <div
            key={idx}
            className='bg-gradient-to-br from-red-600/10 to-red-500/5 border border-red-500/30 rounded-xl p-5 hover:border-red-400/50 transition'
          >
            <div className='text-xl font-bold text-red-400 mb-2'>{stock.ticker}</div>
            <div className='text-2xl font-black text-white mb-3'>
              ₩{stock.price.toLocaleString()}
            </div>
            <div className='text-lg font-bold text-red-400'>{stock.change.toFixed(2)}%</div>
            <div className='text-xs text-slate-500 mt-3'>20일: {stock.momentum_20d.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectorTab({ news }: { news: any[] }) {
  const sectors = [
    { name: '반도체', count: 0, impact: 0, articles: 0 },
    { name: '금융', count: 0, impact: 0, articles: 0 },
    { name: '자동차', count: 0, impact: 0, articles: 0 },
    { name: '에너지', count: 0, impact: 0, articles: 0 },
    { name: '기술', count: 0, impact: 0, articles: 0 },
    { name: '배터리', count: 0, impact: 0, articles: 0 },
  ];

  news.forEach(article => {
    sectors.forEach(sector => {
      if (article.title.includes(sector.name)) {
        sector.articles++;
        sector.impact += article.impact_score;
      }
    });
  });

  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>📊 섹터 분석</h2>
      <p className='text-slate-400 mb-6'>산업별 뉴스 영향도</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sectors.filter(s => s.articles > 0).map((sector, idx) => {
          const colors = SECTOR_COLORS[sector.name] || SECTOR_COLORS['기술'];
          const avgImpact = Math.round(sector.impact / sector.articles);
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-6 hover:border-blue-400/50 transition`}
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className={`text-lg font-bold ${colors.text}`}>{sector.name}</h3>
                <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
              </div>

              <div className='space-y-3'>
                <div>
                  <div className='text-xs text-slate-400 mb-1'>뉴스 수</div>
                  <div className='text-2xl font-bold text-white'>{sector.articles}</div>
                </div>
                <div>
                  <div className='text-xs text-slate-400 mb-1'>평균 영향도</div>
                  <div className='w-full bg-slate-700/50 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full ${colors.dot}`}
                      style={{ width: `${avgImpact}%` }}
                    />
                  </div>
                  <div className='text-sm font-bold text-amber-400 mt-2'>{avgImpact}/100</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioTab({ stocks }: { stocks: any[] }) {
  const total = stocks.length;
  const gainers = stocks.filter((s: any) => s.change > 0).length;
  const losers = stocks.filter((s: any) => s.change < 0).length;
  const avgChange = (stocks.reduce((sum: number, s: any) => sum + s.change, 0) / total).toFixed(2);

  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>💼 포트폴리오</h2>
      <p className='text-slate-400 mb-6'>추적 종목 통계</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <div className='bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-xl p-6'>
          <div className='text-sm text-slate-400 mb-2'>총 종목</div>
          <div className='text-4xl font-black text-blue-400'>{total}</div>
        </div>
        <div className='bg-gradient-to-br from-emerald-600/20 to-emerald-500/10 border border-emerald-500/30 rounded-xl p-6'>
          <div className='text-sm text-slate-400 mb-2'>상승주</div>
          <div className='text-4xl font-black text-emerald-400'>{gainers}</div>
        </div>
        <div className='bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-500/30 rounded-xl p-6'>
          <div className='text-sm text-slate-400 mb-2'>하락주</div>
          <div className='text-4xl font-black text-red-400'>{losers}</div>
        </div>
        <div className={`bg-gradient-to-br ${avgChange > '0' ? 'from-emerald-600/20 to-emerald-500/10 border border-emerald-500/30' : 'from-red-600/20 to-red-500/10 border border-red-500/30'} rounded-xl p-6`}>
          <div className='text-sm text-slate-400 mb-2'>평균 변동</div>
          <div className={`text-4xl font-black ${avgChange > '0' ? 'text-emerald-400' : 'text-red-400'}`}>
            {parseFloat(avgChange) > 0 ? '+' : ''}{avgChange}%
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700/50 rounded-xl p-6 overflow-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-slate-700/50'>
              <th className='text-left py-3 px-4 font-semibold text-slate-400'>종목</th>
              <th className='text-right py-3 px-4 font-semibold text-slate-400'>가격</th>
              <th className='text-right py-3 px-4 font-semibold text-slate-400'>변동</th>
            </tr>
          </thead>
          <tbody>
            {stocks.slice(0, 15).map((stock: any, idx: number) => (
              <tr key={idx} className='border-b border-slate-700/30 hover:bg-slate-800/30'>
                <td className='py-3 px-4 font-semibold text-white'>{stock.ticker}</td>
                <td className='text-right py-3 px-4 text-slate-300'>₩{stock.price.toLocaleString()}</td>
                <td className={`text-right py-3 px-4 font-bold ${stock.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ETFTab({ stocks }: { stocks: any[] }) {
  const etfs = stocks.filter((s: any) => s.name?.includes('KODEX') || s.name?.includes('TIGER')).slice(0, 20);

  if (!etfs.length) return <div className='text-center py-12 text-slate-400'>ETF 데이터 로딩 중...</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>📈 한국 ETF</h2>
      <p className='text-slate-400 mb-6'>주요 한국 ETF 종목</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {etfs.map((etf: any, idx: number) => (
          <div key={idx} className='bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700/50 hover:border-purple-500/50 rounded-xl p-5 transition'>
            <div className='text-sm font-bold text-purple-400 mb-2'>{etf.name || etf.ticker}</div>
            <div className='text-2xl font-bold text-white mb-3'>₩{etf.price.toLocaleString()}</div>
            <div className={`text-lg font-bold ${etf.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {etf.change > 0 ? '▲' : '▼'} {Math.abs(etf.change).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>⚙️ 설정</h2>
      <p className='text-slate-400 mb-6'>시스템 정보</p>

      <div className='space-y-4'>
        <div className='bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700/50 rounded-xl p-6'>
          <h3 className='text-lg font-bold text-blue-400 mb-2'>📊 추적 자산</h3>
          <p className='text-slate-300'>한국 주식 60개 + ETF 20개 + 글로벌 6개 = 총 86개</p>
        </div>

        <div className='bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700/50 rounded-xl p-6'>
          <h3 className='text-lg font-bold text-green-400 mb-2'>🤖 AI 분석</h3>
          <p className='text-slate-300'>10가지 경제 시나리오 기반 다단계 스코어링</p>
        </div>

        <div className='bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700/50 rounded-xl p-6'>
          <h3 className='text-lg font-bold text-purple-400 mb-2'>📡 데이터 소스</h3>
          <p className='text-slate-300'>50+ 뉴스 매체, 실시간 업데이트</p>
        </div>

        <div className='bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700/50 rounded-xl p-6'>
          <h3 className='text-lg font-bold text-amber-400 mb-2'>ℹ️ 소개</h3>
          <p className='text-slate-300'>한국 주식 분석기 v2.0 • Claude AI Powered</p>
        </div>
      </div>
    </div>
  );
}
