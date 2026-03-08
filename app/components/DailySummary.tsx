'use client';

export default function DailySummary({ summary, stats }: any) {
  if (!summary) return null;

  return (
    <div className="summary-card">
      <h2>📰 오늘의 지정학적 요약</h2>
      <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>{summary}</p>
      <div className="summary-stats">
        <div className="stat">
          <div className="stat-value">{stats?.articles}</div>
          <div className="stat-label">기사 수집</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats?.sources}</div>
          <div className="stat-label">뉴스 출처</div>
        </div>
        <div className="stat">
          <div className="stat-value">AI</div>
          <div className="stat-label">자동 분석</div>
        </div>
      </div>
    </div>
  );
}
