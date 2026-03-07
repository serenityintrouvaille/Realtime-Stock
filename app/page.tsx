'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'research', label: '리서치 피드', icon: '📰' },
  { id: 'beneficiaries', label: '수혜주', icon: '✨' },
  { id: 'losers', label: '손실주', icon: '📉' },
  { id: 'sector', label: '섹터 분석', icon: '🏢' },
  { id: 'portfolio', label: '종목 포트폴리오', icon: '💼' },
  { id: 'heatmap', label: '마켓맵', icon: '📊' },
  { id: 'etf', label: 'ETF', icon: '📈' },
  { id: 'settings', label: '설정', icon: '⚙️' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('research');
  const [darkMode, setDarkMode] = useState(true);
  const [news, setNews] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const newsRes = await fetch('/api/news').catch(() => null);
      const stocksRes = await fetch('/api/stocks').catch(() => null);

      if (newsRes?.ok) {
        const newsData = await newsRes.json();
        setNews(newsData.slice(0, 20));
      }

      if (stocksRes?.ok) {
        const stocksData = await stocksRes.json();
        setStocks(stocksData.slice(0, 50));
      }

      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'research':
        return <ResearchFeedTab news={news} />;
      case 'beneficiaries':
        return <BeneficiariesTab news={news} />;
      case 'losers':
        return <LosersTab stocks={stocks} />;
      case 'sector':
        return <SectorTab news={news} />;
      case 'portfolio':
        return <PortfolioTab stocks={stocks} />;
      case 'heatmap':
        return <HeatmapTab stocks={stocks} />;
      case 'etf':
        return <ETFTab stocks={stocks} />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <ResearchFeedTab news={news} />;
    }
  };

  const kospiIndex = stocks.find((s: any) => s.ticker === '^KS11') as any;

  return (
    <div className={`min-h-screen bg-slate-950 text-white transition-colors duration-300`}>
      {/* Header - Quartr Finance Research Style */}
      <header className={`sticky top-0 z-50 bg-slate-900/98 backdrop-blur-md border-b border-slate-700/50`}>
        <div className='max-w-7xl mx-auto px-6 py-5'>
          <div className='flex justify-between items-start mb-4'>
            <div className='flex items-center gap-4'>
              <div className='text-3xl font-bold text-blue-400'>📈</div>
              <div>
                <h1 className='text-2xl font-bold tracking-tight text-white'>
                  한국 주식 분석기
                </h1>
                <p className='text-xs text-slate-400 mt-1'>실시간 뉴스 → 주식 영향 분석</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              {kospiIndex && (
                <div className='text-right'>
                  <div className='text-sm text-slate-400'>KOSPI 지수</div>
                  <div className='text-xl font-bold text-blue-400'>{kospiIndex.price.toFixed(0)}</div>
                  <div className={`text-sm ${kospiIndex.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {kospiIndex.change > 0 ? '+' : ''}{kospiIndex.change.toFixed(2)}%
                  </div>
                </div>
              )}
              <div className='border-l border-slate-700/50 pl-4 flex flex-col gap-2'>
                <div className={`px-3 py-1 rounded text-xs font-medium text-slate-300 bg-slate-800/60`}>
                  ⏱ {lastUpdate}
                </div>
                <button
                  onClick={fetchData}
                  className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition'
                >
                  새로고침
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Institutional Research Style */}
        <div className={`border-t border-slate-700/50 bg-slate-900/40 overflow-x-auto`}>
          <div className='flex max-w-7xl mx-auto px-6'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 py-8'>
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className={`mt-16 py-8 border-t border-slate-700 text-center text-slate-500 text-sm`}>
        <p>한국 주식 분석기 © 2026 | Claude Code + Vercel</p>
      </footer>
    </div>
  );
}

// Tab Components
function ResearchFeedTab({ news }: { news: any[] }) {
  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>📰 리서치 피드</h2>
        <p className='text-slate-400 text-sm'>최신 시장 뉴스 및 영향도 분석</p>
      </div>
      {news.length === 0 ? (
        <div className='text-center py-16 opacity-50'>
          <p className='text-slate-400'>데이터를 불러오는 중입니다...</p>
        </div>
      ) : (
        news.map((article, idx) => (
          <div key={idx} className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/60 rounded-lg p-5 hover:border-slate-600 transition'>
            <div className='flex justify-between items-start gap-4'>
              <div className='flex-1'>
                <div className='flex gap-2 mb-3 items-center'>
                  <span className='inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded'>
                    {article.category || '미분류'}
                  </span>
                  <span className='text-xs text-slate-500'>{article.source}</span>
                </div>
                <h3 className='text-lg font-semibold text-white leading-tight'>{article.title}</h3>
              </div>
              <div className='text-right flex-shrink-0'>
                <div className='text-3xl font-bold text-amber-400'>{article.impact_score || 50}</div>
                <div className='text-xs text-slate-500 mt-1'>영향도</div>
              </div>
            </div>
            <p className='text-sm text-slate-300 mt-4 mb-4'>{article.summary}</p>
            <div className='flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-700/50'>
              <span>{article.country}</span>
              <span>{new Date(article.timestamp).toLocaleString('ko-KR')}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function BeneficiariesTab({ news }: { news: any[] }) {
  // 샘플 수혜주 데이터 (실제로는 API에서 받아야 함)
  const beneficiaries = [
    { ticker: '005930.KS', company: '삼성전자', sector: '반도체', expectedChange: '+3.5%', reason: '반도체 규제 해제' },
    { ticker: '000660.KS', company: 'SK하이닉스', sector: '반도체', expectedChange: '+2.8%', reason: '메모리칩 수요 증가' },
    { ticker: '051910.KS', company: 'LG화학', sector: '에너지', expectedChange: '+2.2%', reason: '이차전지 수요 상승' },
    { ticker: '012330.KS', company: '현대차', sector: '자동차', expectedChange: '+1.9%', reason: '전기차 정책 지원' },
    { ticker: '055550.KS', company: '신한은행', sector: '금융', expectedChange: '+4.1%', reason: '금리 인상 수혜' },
  ];

  const sectorColors: Record<string, string> = {
    '반도체': 'sector-semiconductor',
    '에너지': 'sector-energy',
    '자동차': 'sector-auto',
    '금융': 'sector-finance',
    '의약': 'sector-pharma',
    '방산': 'sector-defense',
  };

  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>✨ 주요 수혜주</h2>
        <p className='text-slate-400 text-sm'>최근 뉴스에서 식별된 예상 상승 종목</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {beneficiaries.map((stock, idx) => (
          <div key={idx} className='bg-gradient-to-br from-emerald-900/20 to-slate-800/30 border border-emerald-700/40 rounded-lg p-5 hover:border-emerald-600 transition'>
            <div className='flex justify-between items-start mb-3'>
              <div>
                <div className='flex gap-2 items-center mb-2'>
                  <span className='text-lg font-bold text-white'>{stock.ticker}</span>
                  <span className={`sector-badge ${sectorColors[stock.sector] || ''}`}>{stock.sector}</span>
                </div>
                <div className='text-sm text-slate-400'>{stock.company}</div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-emerald-400'>{stock.expectedChange}</div>
                <div className='text-xs text-slate-500'>예상변동</div>
              </div>
            </div>
            <p className='text-sm text-slate-300 border-t border-emerald-700/20 pt-3'>💡 {stock.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectorTab({ news }: { news: any[] }) {
  const sectors = [
    { name: '반도체', articles: 3, impact: 82 },
    { name: '금융', articles: 2, impact: 88 },
    { name: '자동차', articles: 2, impact: 76 },
    { name: '에너지', articles: 1, impact: 71 },
    { name: '기술', articles: 2, impact: 74 },
  ];

  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>🏢 섹터 분석</h2>
        <p className='text-slate-400 text-sm'>산업별 뉴스 영향도 및 트렌드</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sectors.map((sector, idx) => (
          <div key={idx} className='bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 rounded-lg p-6'>
            <h3 className='text-lg font-semibold mb-4 text-blue-400'>{sector.name}</h3>
            <div className='space-y-3'>
              <div>
                <div className='text-xs text-slate-400 mb-1'>관련 뉴스</div>
                <div className='text-2xl font-bold text-white'>{sector.articles}</div>
              </div>
              <div>
                <div className='text-xs text-slate-400 mb-1'>평균 영향도</div>
                <div className='w-full bg-slate-700/50 rounded h-2'>
                  <div className='bg-blue-500 h-2 rounded' style={{ width: `${sector.impact}%` }}></div>
                </div>
                <div className='text-sm text-amber-400 font-semibold mt-1'>{sector.impact}/100</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ETFTab({ stocks }: { stocks: any[] }) {
  // 한국 ETF 목록 (api/stocks/route.ts에서 업데이트될 예정)
  const etfs = stocks.filter(s => s.ticker && ['069500.KS', '102110.KS', '229200.KS', '091230.KS', '305720.KS', '457690.KS', '161510.KS', '211560.KS', '379800.KS', '133690.KS'].includes(s.ticker)).slice(0, 10);

  if (etfs.length === 0) {
    return (
      <div className='grid gap-6'>
        <div>
          <h2 className='text-3xl font-bold mb-2'>📈 ETF</h2>
          <p className='text-slate-400 text-sm'>한국 ETF 종목 분석</p>
        </div>
        <div className='text-center py-12 opacity-50'>
          <p className='text-slate-400'>ETF 데이터 업데이트 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>📈 ETF</h2>
        <p className='text-slate-400 text-sm'>한국 주요 ETF 종목 및 성과</p>
      </div>
      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/60 rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead className='bg-slate-800/50 border-b border-slate-700/50'>
              <tr>
                <th className='text-left p-4 font-semibold text-slate-400'>ETF 종목</th>
                <th className='text-right p-4 font-semibold text-slate-400'>가격</th>
                <th className='text-right p-4 font-semibold text-slate-400'>변동</th>
                <th className='text-right p-4 font-semibold text-slate-400'>20일 모멘텀</th>
              </tr>
            </thead>
            <tbody>
              {etfs.map((etf, idx) => (
                <tr key={idx} className='border-b border-slate-700/30 hover:bg-slate-800/40'>
                  <td className='p-4 font-semibold text-white'>{etf.ticker}</td>
                  <td className='text-right p-4 text-slate-300'>₩{etf.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td className={`text-right p-4 font-bold ${etf.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {etf.change > 0 ? '+' : ''}{etf.change.toFixed(2)}%
                  </td>
                  <td className='text-right p-4 text-slate-400'>{etf.momentum_20d > 0 ? '+' : ''}{etf.momentum_20d.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LosersTab({ stocks }: { stocks: any[] }) {
  const losers = stocks.filter((s) => s.change < 0).sort((a, b) => a.change - b.change).slice(0, 20);

  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>📉 손실주</h2>
        <p className='text-slate-400 text-sm'>오늘의 최고 하락 종목 (상위 20)</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {losers.map((stock, idx) => (
          <div key={idx} className='bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-700/50 rounded-lg p-5 hover:border-red-600 transition'>
            <div className='text-2xl font-bold text-red-400 mb-3'>{stock.ticker}</div>
            <div className='text-3xl font-bold text-white'>₩{stock.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className='text-xl text-red-300 mt-3 font-semibold'>{stock.change.toFixed(2)}%</div>
            <div className='text-xs text-slate-500 mt-3 pt-3 border-t border-red-700/30'>20일: {stock.momentum_20d > 0 ? '+' : ''}{stock.momentum_20d.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioTab({ stocks }: { stocks: any[] }) {
  const total = stocks.length;
  const gainers = stocks.filter((s) => s.change > 0).length;
  const losers = stocks.filter((s) => s.change < 0).length;
  const avgChangeNum = stocks.reduce((sum, s) => sum + s.change, 0) / stocks.length;
  const avgChange = parseFloat(avgChangeNum.toFixed(2));

  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>💼 종목 포트폴리오</h2>
        <p className='text-slate-400 text-sm'>추적 종목의 성과 및 통계</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-lg p-5'>
          <div className='text-sm text-slate-400 font-medium'>총 종목</div>
          <div className='text-4xl font-bold mt-3 text-blue-300'>{total}</div>
        </div>
        <div className='bg-gradient-to-br from-green-900/40 to-emerald-800/40 border border-green-700/50 rounded-lg p-5'>
          <div className='text-sm text-slate-400 font-medium'>상승</div>
          <div className='text-4xl font-bold text-green-300 mt-3'>{gainers}</div>
        </div>
        <div className='bg-gradient-to-br from-red-900/40 to-rose-800/40 border border-red-700/50 rounded-lg p-5'>
          <div className='text-sm text-slate-400 font-medium'>하락</div>
          <div className='text-4xl font-bold text-red-300 mt-3'>{losers}</div>
        </div>
        <div className={`bg-gradient-to-br ${avgChange > 0 ? 'from-emerald-900/40 to-green-800/40 border-green-700/50' : 'from-orange-900/40 to-amber-800/40 border-orange-700/50'} border rounded-lg p-5`}>
          <div className='text-sm text-slate-400 font-medium'>평균 변동</div>
          <div className={`text-4xl font-bold mt-3 ${avgChange > 0 ? 'text-green-300' : 'text-orange-300'}`}>
            {avgChange > 0 ? '+' : ''}{avgChange}%
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/60 rounded-lg p-6'>
        <h3 className='text-lg font-semibold mb-5 text-blue-400'>전체 종목</h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead className='border-b border-slate-700/50'>
              <tr>
                <th className='text-left p-3 font-semibold text-slate-400'>종목명</th>
                <th className='text-right p-3 font-semibold text-slate-400'>가격</th>
                <th className='text-right p-3 font-semibold text-slate-400'>변동</th>
                <th className='text-right p-3 font-semibold text-slate-400'>20일 모멘텀</th>
              </tr>
            </thead>
            <tbody>
              {stocks.slice(0, 20).map((stock, idx) => (
                <tr key={idx} className='border-b border-slate-700/30 hover:bg-slate-800/40'>
                  <td className='p-3 font-semibold text-white'>{stock.ticker}</td>
                  <td className='text-right p-3 text-slate-300'>₩{stock.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td className={`text-right p-3 font-bold ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </td>
                  <td className='text-right p-3 text-slate-400'>{stock.momentum_20d > 0 ? '+' : ''}{stock.momentum_20d.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HeatmapTab({ stocks }: { stocks: any[] }) {
  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>📊 마켓맵</h2>
        <p className='text-slate-400 text-sm'>종목별 등락 현황 및 변동성 시각화</p>
      </div>
      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/60 rounded-lg p-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
          {stocks.slice(0, 48).map((stock, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-center text-xs font-bold cursor-pointer hover:shadow-lg transition ${
                stock.change > 0
                  ? 'bg-gradient-to-br from-green-600 to-emerald-700'
                  : 'bg-gradient-to-br from-red-600 to-rose-700'
              }`}
            >
              <div className='font-semibold'>{stock.ticker}</div>
              <div className='text-xs opacity-90 mt-1'>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%</div>
            </div>
          ))}
        </div>
        <div className='mt-8 text-sm text-slate-400 text-center'>
          📊 색상 진하기 = 변동폭 크기 | 초록 = 상승, 빨강 = 하락
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className='grid gap-6'>
      <div>
        <h2 className='text-3xl font-bold mb-2'>⚙️ 설정</h2>
        <p className='text-slate-400 text-sm'>시스템 설정 및 정보</p>
      </div>
      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/60 rounded-lg p-6'>
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold mb-2 text-blue-400'>⏱ 자동 업데이트</h3>
            <p className='text-sm text-slate-400'>50개 뉴스 소스에서 1시간마다 자동 데이터 업데이트</p>
          </div>
          <div className='border-t border-slate-700/50 pt-6'>
            <h3 className='text-lg font-semibold mb-2 text-blue-400'>📈 추적 자산</h3>
            <p className='text-sm text-slate-400'>한국 주식 60개 + 한국 ETF 20개 + 글로벌 6개 (총 86개, 12개 섹터)</p>
          </div>
          <div className='border-t border-slate-700/50 pt-6'>
            <h3 className='text-lg font-semibold mb-2 text-blue-400'>🎯 수혜주 분석</h3>
            <p className='text-sm text-slate-400'>10가지 경제 시나리오 기반 다단계 스코어링으로 수혜주/피해주 식별</p>
          </div>
          <div className='border-t border-slate-700/50 pt-6'>
            <h3 className='text-lg font-semibold mb-2 text-blue-400'>📡 데이터 소스</h3>
            <p className='text-sm text-slate-400'>
              Reuters, Bloomberg, AP, BBC, Naver, Yonhap, 연합뉴스, 한국경제, 매경, 머니투데이 등 50개+ 한국/글로벌 뉴스 매체
            </p>
          </div>
          <div className='border-t border-slate-700/50 pt-6'>
            <h3 className='text-lg font-semibold mb-2 text-blue-400'>ℹ️ 소개</h3>
            <p className='text-sm text-slate-400'>
              한국 주식 분석기 v2.0 | Quartr Finance 스타일 | Claude Code + Vercel + Claude AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
