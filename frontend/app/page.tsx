'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'news', label: '📰 News Feed', icon: '📰' },
  { id: 'regional', label: '🌍 Regional', icon: '🌍' },
  { id: 'winners', label: '📈 Winners', icon: '📈' },
  { id: 'losers', label: '📉 Losers', icon: '📉' },
  { id: 'analysis', label: '🎯 Analysis', icon: '🎯' },
  { id: 'portfolio', label: '💼 Portfolio', icon: '💼' },
  { id: 'heatmap', label: '📊 Heatmap', icon: '📊' },
  { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');
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
      case 'news':
        return <NewsTab news={news} />;
      case 'regional':
        return <RegionalTab news={news} />;
      case 'winners':
        return <WinnersTab stocks={stocks} />;
      case 'losers':
        return <LosersTab stocks={stocks} />;
      case 'analysis':
        return <AnalysisTab news={news} stocks={stocks} />;
      case 'portfolio':
        return <PortfolioTab stocks={stocks} />;
      case 'heatmap':
        return <HeatmapTab stocks={stocks} />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <NewsTab news={news} />;
    }
  };

  const bgClass = darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const cardClass = darkMode
    ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'
    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='text-3xl'>🌍</div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
                GeopoliticStock
              </h1>
              <p className='text-xs opacity-60'>Real-time News → Stock Analysis</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
              🔄 {lastUpdate}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={fetchData}
              className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition'
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200'} overflow-x-auto`}>
          <div className='flex max-w-7xl mx-auto px-4'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : darkMode
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
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
      <footer className={`mt-16 py-8 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'} text-center opacity-60 text-sm`}>
        <p>GeopoliticStock © 2026 | Powered by Claude Code + Vercel</p>
      </footer>
    </div>
  );
}

// Tab Components
function NewsTab({ news }: { news: any[] }) {
  return (
    <div className='grid gap-4'>
      <h2 className='text-2xl font-bold mb-4'>📰 Latest News</h2>
      {news.length === 0 ? (
        <div className='text-center py-12 opacity-50'>
          <p>No news data available. Check back soon!</p>
        </div>
      ) : (
        news.map((article, idx) => (
          <div key={idx} className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-4 hover:shadow-lg transition'>
            <div className='flex justify-between items-start mb-2'>
              <div>
                <span className='inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded'>
                  {article.category || 'N/A'}
                </span>
                <h3 className='text-lg font-bold mt-2'>{article.title}</h3>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-yellow-400'>{article.impact_score || 50}</div>
                <div className='text-xs opacity-50'>Impact</div>
              </div>
            </div>
            <p className='text-sm opacity-75 mb-2'>{article.summary}</p>
            <div className='flex justify-between items-center text-xs opacity-50'>
              <span>{article.source} · {article.country}</span>
              <span>{new Date(article.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function RegionalTab({ news }: { news: any[] }) {
  const byRegion = news.reduce((acc, article) => {
    const region = article.region || 'Unknown';
    if (!acc[region]) acc[region] = [];
    acc[region].push(article);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className='grid gap-6'>
      <h2 className='text-2xl font-bold mb-4'>🌍 Regional Analysis</h2>
      {Object.entries(byRegion).map(([region, articles]) => (
        <div key={region} className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6'>
          <h3 className='text-xl font-bold mb-4'>{region}</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {articles.slice(0, 6).map((article, idx) => (
              <div key={idx} className='bg-slate-800/50 p-3 rounded border border-slate-600'>
                <p className='text-sm font-semibold'>{article.title.substring(0, 50)}...</p>
                <div className='flex justify-between mt-2 text-xs opacity-50'>
                  <span>{article.source}</span>
                  <span className='text-yellow-400'>{article.impact_score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WinnersTab({ stocks }: { stocks: any[] }) {
  const winners = stocks.filter((s) => s.change > 0).sort((a, b) => b.change - a.change).slice(0, 20);

  return (
    <div className='grid gap-4'>
      <h2 className='text-2xl font-bold mb-4'>📈 Top Winners</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {winners.map((stock, idx) => (
          <div key={idx} className='bg-gradient-to-br from-green-900 to-emerald-900 border border-green-700 rounded-lg p-4'>
            <div className='text-2xl font-bold text-green-400'>{stock.ticker}</div>
            <div className='text-3xl font-bold mt-2'>${stock.price.toFixed(2)}</div>
            <div className='text-xl text-green-300 mt-1'>+{stock.change.toFixed(2)}%</div>
            <div className='text-xs opacity-60 mt-2'>20d: {stock.momentum_20d > 0 ? '+' : ''}{stock.momentum_20d.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LosersTab({ stocks }: { stocks: any[] }) {
  const losers = stocks.filter((s) => s.change < 0).sort((a, b) => a.change - b.change).slice(0, 20);

  return (
    <div className='grid gap-4'>
      <h2 className='text-2xl font-bold mb-4'>📉 Top Losers</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {losers.map((stock, idx) => (
          <div key={idx} className='bg-gradient-to-br from-red-900 to-rose-900 border border-red-700 rounded-lg p-4'>
            <div className='text-2xl font-bold text-red-400'>{stock.ticker}</div>
            <div className='text-3xl font-bold mt-2'>${stock.price.toFixed(2)}</div>
            <div className='text-xl text-red-300 mt-1'>{stock.change.toFixed(2)}%</div>
            <div className='text-xs opacity-60 mt-2'>20d: {stock.momentum_20d > 0 ? '+' : ''}{stock.momentum_20d.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisTab({ news, stocks }: { news: any[]; stocks: any[] }) {
  return (
    <div className='grid gap-6'>
      <h2 className='text-2xl font-bold mb-4'>🎯 Impact Analysis</h2>
      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6'>
        <h3 className='text-xl font-bold mb-4'>Top News Impact</h3>
        {news.slice(0, 5).map((article, idx) => (
          <div key={idx} className='mb-4 pb-4 border-b border-slate-600'>
            <div className='flex justify-between mb-2'>
              <span className='font-semibold'>{article.title.substring(0, 60)}...</span>
              <span className='text-yellow-400 font-bold'>{article.impact_score}/100</span>
            </div>
            <div className='text-sm opacity-60'>{article.category} · {article.source}</div>
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
  const avgChange = (stocks.reduce((sum, s) => sum + s.change, 0) / stocks.length).toFixed(2);

  return (
    <div className='grid gap-6'>
      <h2 className='text-2xl font-bold mb-4'>💼 Portfolio Overview</h2>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 rounded-lg p-4'>
          <div className='text-sm opacity-60'>Total Stocks</div>
          <div className='text-3xl font-bold mt-2'>{total}</div>
        </div>
        <div className='bg-gradient-to-br from-green-900 to-emerald-800 border border-green-700 rounded-lg p-4'>
          <div className='text-sm opacity-60'>Gainers</div>
          <div className='text-3xl font-bold text-green-300 mt-2'>{gainers}</div>
        </div>
        <div className='bg-gradient-to-br from-red-900 to-rose-800 border border-red-700 rounded-lg p-4'>
          <div className='text-sm opacity-60'>Losers</div>
          <div className='text-3xl font-bold text-red-300 mt-2'>{losers}</div>
        </div>
        <div className={`bg-gradient-to-br ${avgChange > 0 ? 'from-emerald-900 to-green-800 border-green-700' : 'from-orange-900 to-amber-800 border-orange-700'} border rounded-lg p-4`}>
          <div className='text-sm opacity-60'>Avg Change</div>
          <div className={`text-3xl font-bold mt-2 ${avgChange > 0 ? 'text-green-300' : 'text-orange-300'}`}>
            {avgChange > 0 ? '+' : ''}{avgChange}%
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6'>
        <h3 className='text-xl font-bold mb-4'>All Stocks</h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead className='border-b border-slate-600'>
              <tr>
                <th className='text-left p-2'>Ticker</th>
                <th className='text-right p-2'>Price</th>
                <th className='text-right p-2'>Change</th>
                <th className='text-right p-2'>20d Momentum</th>
              </tr>
            </thead>
            <tbody>
              {stocks.slice(0, 20).map((stock, idx) => (
                <tr key={idx} className='border-b border-slate-700 hover:bg-slate-800/50'>
                  <td className='p-2 font-semibold'>{stock.ticker}</td>
                  <td className='text-right p-2'>${stock.price.toFixed(2)}</td>
                  <td className={`text-right p-2 font-bold ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </td>
                  <td className='text-right p-2 opacity-60'>{stock.momentum_20d > 0 ? '+' : ''}{stock.momentum_20d.toFixed(1)}%</td>
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
      <h2 className='text-2xl font-bold mb-4'>📊 Market Heatmap</h2>
      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
          {stocks.slice(0, 48).map((stock, idx) => (
            <div
              key={idx}
              className={`p-2 rounded text-center text-xs font-bold cursor-pointer hover:shadow-lg transition ${
                stock.change > 0
                  ? 'bg-gradient-to-br from-green-600 to-emerald-700'
                  : 'bg-gradient-to-br from-red-600 to-rose-700'
              }`}
            >
              <div>{stock.ticker}</div>
              <div className='text-xs opacity-80'>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%</div>
            </div>
          ))}
        </div>
        <div className='mt-6 text-sm opacity-60 text-center'>
          Color intensity represents change magnitude. Green = gainers, Red = losers
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className='grid gap-6'>
      <h2 className='text-2xl font-bold mb-4'>⚙️ Settings</h2>
      <div className='bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6'>
        <div className='space-y-4'>
          <div>
            <h3 className='text-lg font-bold mb-2'>Auto-Update Interval</h3>
            <p className='text-sm opacity-60'>Data updates every hour from 50 news sources</p>
          </div>
          <div className='border-t border-slate-600 pt-4'>
            <h3 className='text-lg font-bold mb-2'>Monitored Assets</h3>
            <p className='text-sm opacity-60'>100 global stocks across 13 categories</p>
          </div>
          <div className='border-t border-slate-600 pt-4'>
            <h3 className='text-lg font-bold mb-2'>Data Sources</h3>
            <p className='text-sm opacity-60'>Reuters, Bloomberg, AP, BBC, and 46+ more</p>
          </div>
          <div className='border-t border-slate-600 pt-4'>
            <h3 className='text-lg font-bold mb-2'>About</h3>
            <p className='text-sm opacity-60'>
              GeopoliticStock v1.0 | Powered by Claude Code, Vercel, and Google Gemini AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
