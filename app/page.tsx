'use client';

import { useEffect, useState } from 'react';
import DailySummary from './components/DailySummary';
import ArticleCard from './components/ArticleCard';
import './globals.css';

interface Article {
  title: string;
  link: string;
  summary: string;
  source: string;
  published: string;
  category: string;
  confidence: number;
}

interface NewsData {
  summary: string;
  articles: Article[];
  timestamp: string;
  total_articles: number;
}

export default function Home() {
  const [data, setData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/data/news_latest.json');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch {
        setData({
          summary: '뉴스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.',
          articles: [],
          timestamp: new Date().toISOString(),
          total_articles: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card" style={{ height: '200px', background: '#f0f0f0' }} />
      </div>
    );
  }

  const categories = ['전체', '군사·갈등', '제재·무역', '정치변화', '테크규제', '거시경제'];
  const filteredArticles = selectedCategory === '전체'
    ? data?.articles || []
    : (data?.articles || []).filter(a => a.category === selectedCategory);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1>🌍 지정학 스톡</h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          50개 글로벌 뉴스 • AI 분석 • 매일 오전 6시 업데이트
        </p>
        <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
          {new Date().toLocaleDateString('ko-KR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </header>

      {data?.summary && (
        <DailySummary
          summary={data.summary}
          stats={{
            articles: data.total_articles,
            sources: 50
          }}
        />
      )}

      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-button ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        <h2>{selectedCategory} ({filteredArticles.length})</h2>
        {filteredArticles.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: '#999' }}>
            해당 카테고리 기사가 없습니다.
          </div>
        ) : (
          filteredArticles.map((article, idx) => (
            <ArticleCard key={idx} article={article} />
          ))
        )}
      </div>

      <footer style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '2px solid #e0e0e0',
        textAlign: 'center',
        color: '#999',
        fontSize: '0.9rem'
      }}>
        <p>🔄 매일 오전 6시(한국 시간) 자동 수집</p>
        <p>AI 분석은 참고용이며, 투자 결정의 유일한 근거로 사용할 수 없습니다.</p>
      </footer>
    </div>
  );
}
