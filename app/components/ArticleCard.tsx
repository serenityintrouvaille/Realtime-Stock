'use client';

const categoryColors: any = {
  '군사·갈등': 'military',
  '제재·무역': 'trade',
  '정치변화': 'political',
  '테크규제': 'tech',
  '거시경제': 'macro'
};

export default function ArticleCard({ article }: any) {
  return (
    <div className="article-card">
      <div className="article-header">
        <div>
          <div className={`tag ${categoryColors[article.category]}`}>
            {article.category}
          </div>
          <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', color: '#999' }}>
            신뢰도: {article.confidence}%
          </span>
        </div>
      </div>

      <h3 className="article-title">{article.title}</h3>

      <div className="article-meta">
        {article.source} • {new Date(article.published).toLocaleDateString('ko-KR')}
      </div>

      <p className="article-summary">{article.summary}</p>

      <div className="article-footer">
        <a href={article.link} target="_blank" rel="noopener" className="read-more">
          자세히 읽기
        </a>
      </div>
    </div>
  );
}
