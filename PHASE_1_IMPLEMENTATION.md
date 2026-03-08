# Phase 1 Implementation Plan - Realtime-Stock

## Overview
Transform from proof-of-concept (10 mock news + 35 stocks) to production MVP with:
- **50+ real news sources** (from 10 mock articles)
- **Google OAuth authentication** (Phase 1 user auth requirement)
- **Yahoo Finance KOSPI/KOSDAQ integration** (15-20min delayed indices)
- **Multi-layer beneficiary scoring** (production algorithm)
- **Persistent data layer** (PostgreSQL for articles, Redis for cache)

**Timeline:** 10-12 days (6-8 weeks with team)
**Success Criteria:** >85% accuracy, <15min news-to-analysis, 1,500+ articles/day

---

## Architectural Decisions (Confirmed)
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Claude API Budget | Deferred | Start with free tier, scale after validation |
| KOSPI/KOSDAQ Data | Yahoo Finance (15-20min) | Free, no auth required, sufficient for institutional analysis |
| Phase 1 Auth | Google OAuth Only | Fastest path to multi-user analytics |

---

## 1. News Source Expansion (10 → 50+)

### Current State
- **10 mock articles** in `app/api/news/route.ts`
- Hardcoded beneficiary data
- No real-time updates

### Target State
- **50+ real news sources** feeding daily
- Automated beneficiary analysis via Claude API
- Real-time updates with <15min latency

### Implementation Strategy

#### Phase 1A: RSS Feed Aggregation (Days 1-3)
Create `backend/services/rss-aggregator.ts`:

```typescript
const RSS_FEEDS = [
  // 한국 경제/시장 (15개)
  { name: '연합뉴스', url: 'https://www.yonhapnewsplus.co.kr/feed/rss/SI/economic.xml', category: '경제' },
  { name: '매경이코노미', url: 'https://www.mk.co.kr/rss/', category: '경제' },
  { name: '한국경제', url: 'https://www.hankyung.com/feed/news/economy.xml', category: '경제' },
  { name: '머니투데이', url: 'https://www.moneytoday.co.kr/rss/', category: '경제' },
  { name: '파이낸셜뉴스', url: 'https://www.fnnews.com/rss/news_main.xml', category: '경제' },
  { name: '이데일리', url: 'https://www.edaily.co.kr/rss/', category: '경제' },
  { name: '서울경제', url: 'https://www.sedaily.com/rss/', category: '경제' },
  { name: '뉴시스', url: 'https://newsis.com/api/article.rss', category: '경제' },
  { name: '헤럴드경제', url: 'https://www.heraldbiz.com/rss/', category: '경제' },
  { name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', category: '글로벌' },
  { name: 'Bloomberg', url: 'https://www.bloomberg.com/feed/podcast/etf-report.xml', category: '글로벌' },
  { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/businessNews', category: '글로벌' },
  { name: 'CoinDesk', url: 'https://feeds.coindesk.com/sections/news/feed', category: '글로벌' },
  { name: 'The Block', url: 'https://feeds.theblockcrypto.com/feed', category: '글로벌' },
  { name: 'Yahoo Finance Korea', url: 'https://finance.yahoo.com/rss/2.0/headline', category: '금융' },

  // 기술/혁신 뉴스 (10개)
  { name: '테크크런치', url: 'https://techcrunch.com/feed/', category: '기술' },
  { name: '더버지', url: 'https://www.theverge.com/rss/index.xml', category: '기술' },
  { name: '엔가젯', url: 'https://www.engadget.com/feed.xml', category: '기술' },
  { name: '슬래시기어', url: 'https://slashgear.com/feed', category: '기술' },
  { name: 'WIRED', url: 'https://www.wired.com/feed/rss', category: '기술' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: '기술' },
  { name: 'The Information', url: 'https://www.theinformation.com/feed.rss', category: '기술' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/rss', category: '기술' },
  { name: 'AnandTech', url: 'https://www.anandtech.com/rss/', category: '기술' },
  { name: 'MacRumors', url: 'https://feeds.macrumors.com/MacRumors/macrumors.xml', category: '기술' },

  // 금융/마켓 (15개)
  { name: '이코노미스트', url: 'https://www.economist.com/finance-and-economics/rss.xml', category: '금융' },
  { name: 'FT Markets', url: 'https://markets.ft.com/data/', category: '금융' },
  { name: '월스트리트저널', url: 'https://feeds.wsj.com/xml/rss/3_7085.xml', category: '금융' },
  { name: '포브스', url: 'https://www.forbes.com/finance/feed2.xml', category: '금융' },
  { name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories/', category: '금융' },
  { name: 'Seeking Alpha', url: 'https://seekingalpha.com/feed.xml', category: '금융' },
  { name: 'ZeroHedge', url: 'https://www.zerohedge.com/feed', category: '금융' },
  { name: 'Trading View Blog', url: 'https://www.tradingview.com/news/feed/', category: '금융' },
  { name: 'StockTwits', url: 'https://stocktwits.com/streams/rss.xml', category: '금융' },
  { name: '뉴욕타임스 비즈니스', url: 'https://feeds.nytimes.com/services/xml/rss/nyt/Business.xml', category: '금융' },
  { name: '가디언 비즈니스', url: 'https://www.theguardian.com/business/rss', category: '금융' },
  { name: '인디펜던트 비즈니스', url: 'https://www.independent.co.uk/business/rss', category: '금융' },
  { name: 'BBC 비즈니스', url: 'http://feeds.bbc.co.uk/news/business/rss.xml', category: '금융' },
  { name: 'CNBC Asia', url: 'https://www.cnbc.com/id/100114989/device/rss/rss.html', category: '금융' },
  { name: '야후 파이낸스 뉴스', url: 'https://finance.yahoo.com/rss/', category: '금융' },
];

// 핵심 함수
async function fetchAndParseRSS(url: string): Promise<NewsArticle[]> {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  return feed.items.map(item => ({
    id: createHash('sha256').update(item.link).digest('hex'),
    title: item.title,
    summary: item.content?.substring(0, 300) || item.description,
    source: feed.title,
    url: item.link,
    timestamp: new Date(item.pubDate),
    category: detectCategory(item.title),
    impact_score: 0, // Claude API will calculate
  }));
}

async function aggregateAllFeeds(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  for (const feed of RSS_FEEDS) {
    try {
      const feedArticles = await fetchAndParseRSS(feed.url);
      articles.push(...feedArticles);
    } catch (err) {
      logger.error(`RSS fetch failed: ${feed.name}`, err);
    }
  }
  return deduplicateArticles(articles); // 같은 뉴스 여러 소스 중복 제거
}
```

#### Phase 1B: Claude API Beneficiary Analysis (Days 4-6)

Create `backend/services/analysis-engine.ts`:

```typescript
async function analyzeBeneficiaries(article: NewsArticle): Promise<BeneficiaryAnalysis> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Analyze this Korean stock market news and identify likely beneficiary and victim stocks:

Title: ${article.title}
Summary: ${article.summary}

Return JSON with:
{
  "scenario": "반도체_규제|에너지_위기|무역분쟁_관세|금리_정책|방산_수요|이차전지_배터리|AI_테크",
  "direct_beneficiaries": [
    {"ticker": "005930.KS", "company": "삼성전자", "expected_change": "+2.5%", "confidence": 0.92}
  ],
  "indirect_beneficiaries": [...],
  "direct_victims": [...],
  "impact_score": 75
}`
    }]
  });

  // Parse and validate response
  return parseClaudeResponse(message.content[0].text);
}

// Scheduled job: Process new articles every 5 minutes
async function processNewArticles() {
  const unanalyzed = await db.articles.findMany({ where: { beneficiaries: null } });
  for (const article of unanalyzed) {
    const analysis = await analyzeBeneficiaries(article);
    await db.articles.update({
      where: { id: article.id },
      data: { beneficiaries: analysis }
    });
    // Cache in Redis for <5sec queries
    await redis.set(`article:${article.id}`, JSON.stringify(analysis));
  }
}
```

#### Phase 1C: Database Storage (Days 7-8)

Schema for `backend/db/schema.prisma`:

```prisma
model NewsArticle {
  id            String   @id @default(cuid())
  title         String
  summary       String   @db.Text
  source        String
  url           String   @unique
  timestamp     DateTime
  category      String
  impact_score  Int      @default(0)

  // Beneficiary analysis
  scenario      String?
  beneficiaries Json?

  // Metadata
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([timestamp])
  @@index([source])
}

model StockPrice {
  id        String   @id @default(cuid())
  ticker    String
  price     Float
  change    Float
  momentum  Float
  timestamp DateTime

  @@index([ticker])
  @@index([timestamp])
}
```

---

## 2. Google OAuth Implementation (Days 3-5)

### Setup

Create `backend/auth/google.ts`:

```typescript
import { Google } from 'arctic';

export const google = new Google({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectURI: `${process.env.PRODUCTION_URL}/api/auth/google/callback`
});

// User session schema
interface UserSession {
  id: string;
  email: string;
  name: string;
  picture: string;
  subscriptions: {
    notifications: boolean;
    daily_digest: boolean;
  };
  preferences: {
    watchlist_tickers: string[];
    alert_scenarios: string[];
  };
  createdAt: Date;
}
```

### Frontend Integration

Add to `app/page.tsx`:

```typescript
function LoginButton() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const state = generateRandomState();
    const url = await google.createAuthorizationURL(state);
    sessionStorage.setItem('oauth_state', state);
    router.push(url.toString());
  };

  return (
    <button onClick={handleGoogleLogin} className="btn-google">
      Google로 로그인
    </button>
  );
}
```

### Callback Handler

Create `app/api/auth/google/callback/route.ts`:

```typescript
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) return new Response('Missing auth params', { status: 400 });

  const storedState = sessionStorage.getItem('oauth_state');
  if (storedState !== state) return new Response('Invalid state', { status: 400 });

  try {
    const tokens = await google.validateAuthorizationCode(code);
    const user = await fetchGoogleUser(tokens.accessToken);

    // Create/update user in DB
    const dbUser = await db.user.upsert({
      where: { email: user.email },
      update: { lastLoginAt: new Date() },
      create: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        createdAt: new Date()
      }
    });

    // Create session
    const sessionToken = generateSessionToken();
    await db.session.create({
      data: {
        userId: dbUser.id,
        token: sessionToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });

    // Redirect to dashboard
    return redirect('/dashboard?session=' + sessionToken);
  } catch (err) {
    return new Response('OAuth failed', { status: 500 });
  }
}
```

---

## 3. Yahoo Finance Integration (Days 5-7)

### KOSPI/KOSDAQ Index Data

Create `backend/services/stock-data.ts`:

```typescript
import yahooFinance from 'yahoo-finance2';

async function fetchKoreanIndices() {
  try {
    // KOSPI index
    const kospi = await yahooFinance.quote('^KS11');
    // KOSDAQ index
    const kosdaq = await yahooFinance.quote('^KQ150');

    return {
      kospi: {
        ticker: '^KS11',
        price: kospi.regularMarketPrice,
        change: kospi.regularMarketChange,
        changePercent: kospi.regularMarketChangePercent,
        timestamp: new Date(kospi.regularMarketTime * 1000),
        latency: '15-20분 지연' // Yahoo Finance typical delay
      },
      kosdaq: {
        ticker: '^KQ150',
        price: kosdaq.regularMarketPrice,
        change: kosdaq.regularMarketChange,
        changePercent: kosdaq.regularMarketChangePercent,
        timestamp: new Date(kosdaq.regularMarketTime * 1000)
      }
    };
  } catch (err) {
    logger.error('Yahoo Finance fetch failed', err);
    return null;
  }
}

// Cache with 15-minute TTL
async function getCachedIndices() {
  const cached = await redis.get('indices:kospi:kosdaq');
  if (cached) return JSON.parse(cached);

  const data = await fetchKoreanIndices();
  await redis.setex('indices:kospi:kosdaq', 900, JSON.stringify(data)); // 15min cache
  return data;
}

// Update app/api/indices/route.ts
export async function GET() {
  const indices = await getCachedIndices();
  return Response.json(indices);
}
```

### Frontend Display Update

In `app/page.tsx` header:

```typescript
useEffect(() => {
  const fetchIndices = async () => {
    const res = await fetch('/api/indices');
    const data = await res.json();
    setIndices(data);
  };

  fetchIndices();
  const interval = setInterval(fetchIndices, 60000); // Update every min
  return () => clearInterval(interval);
}, []);

// Display in header
<div className="flex gap-8 items-center">
  <div className="text-center">
    <p className="text-xs text-slate-400">KOSPI</p>
    <p className={`text-lg font-bold ${indices?.kospi?.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
      {indices?.kospi?.price?.toFixed(2)}
      <span className="text-xs"> ({indices?.kospi?.changePercent?.toFixed(2)}%)</span>
    </p>
  </div>
  <div className="text-center">
    <p className="text-xs text-slate-400">KOSDAQ</p>
    <p className={`text-lg font-bold ${indices?.kosdaq?.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
      {indices?.kosdaq?.price?.toFixed(2)}
      <span className="text-xs"> ({indices?.kosdaq?.changePercent?.toFixed(2)}%)</span>
    </p>
  </div>
  <p className="text-xs text-slate-500">Yahoo Finance (15-20분 지연)</p>
</div>
```

---

## 4. Multi-Layer Beneficiary Scoring Algorithm

### Current State
- Template-based (10 hardcoded scenarios)
- Mock data in `app/api/news/route.ts`
- No Claude AI analysis

### Production Algorithm

Update `analysis.py` to use 5-layer scoring:

```python
def calculate_beneficiary_score(
    ticker: str,
    article: NewsArticle,
    scenario: str,
    stock_data: StockData
) -> BeneficiaryScore:
    """
    5-layer weighted scoring:
    1. Sector match (0-25 points)
    2. Company mention (0-20 points)
    3. Historical correlation (0-20 points)
    4. Market cap weight (0-20 points)
    5. Momentum boost (0-15 points)
    """

    score = 0

    # Layer 1: Sector match (0-25)
    sector_match = calculate_sector_match(ticker, scenario)  # 0-1.0
    score += sector_match * 25

    # Layer 2: Company mention (0-20)
    mention_score = calculate_mention_confidence(ticker, article.text)
    score += mention_score * 20

    # Layer 3: Historical correlation (0-20)
    # Based on backtesting: did this ticker spike on similar news?
    historical = get_historical_correlation(ticker, scenario)  # 0-1.0
    score += historical * 20

    # Layer 4: Market cap weight (0-20)
    # Large cap = more likely to move on news
    market_cap = stock_data.get('market_cap')
    cap_weight = min(1.0, market_cap / 100_000_000_000)  # Normalize to 100T cap
    score += cap_weight * 20

    # Layer 5: Momentum boost (0-15)
    # Currently trending up? Give it extra weight
    momentum = stock_data.get('momentum_20d', 0)
    if momentum > 5:
        score += min(15, momentum / 10 * 15)

    # Final score: 0-100
    final_score = min(100, score)

    # Convert to expected change %
    expected_change = (final_score / 100) * 5.0  # Max ±5% expected move

    return BeneficiaryScore(
        score=final_score,
        expected_change=f"+{expected_change:.1f}%" if score > 50 else f"{expected_change:.1f}%",
        confidence=calculate_confidence_interval(score)
    )
```

### Implementation Timeline

| Week | Task | Output |
|------|------|--------|
| Week 1 | RSS aggregation setup | 50+ feeds integrated |
| Week 2 | Claude API integration | Automated analysis pipeline |
| Week 3 | Database schema + storage | PostgreSQL + Redis ready |
| Week 4 | Google OAuth + frontend | User authentication |
| Week 5 | Yahoo Finance integration | Live KOSPI/KOSDAQ display |
| Week 6 | Multi-layer scoring | Production algorithm ready |
| Week 7-8 | Testing + optimization | >85% accuracy validated |

---

## 5. Phase 1 Success Criteria

### Data Quality Metrics
- [ ] >50 news sources feeding
- [ ] <300 sec news-to-analysis latency
- [ ] >85% accuracy on beneficiary predictions (backtested)
- [ ] <2% duplicate articles after deduplication
- [ ] Zero downtime on RSS aggregation

### User Experience Metrics
- [ ] All UI in Korean (100% completion)
- [ ] KOSPI/KOSDAQ live display with <15min delay
- [ ] Google OAuth login functional
- [ ] Beneficiary scoring visible on all 10 tabs
- [ ] <3 sec page load time on desktop

### System Metrics
- [ ] PostgreSQL: <100ms queries on 10K+ articles
- [ ] Redis: >95% hit rate for cached indices
- [ ] API: <500ms response time for /api/news
- [ ] Memory: <512MB footprint
- [ ] CPU: <20% average usage

---

## 6. Deployment Strategy

### Staging (End of Week 2)
```bash
# Deploy to Vercel staging
vercel deploy --prod --scope=personal

# Verify endpoints
curl https://staging.realtime-stock.vercel.app/api/news
curl https://staging.realtime-stock.vercel.app/api/stocks
curl https://staging.realtime-stock.vercel.app/api/indices
```

### Production (End of Week 4)
- Promote staging to production
- Enable monitoring (Sentry)
- Set up alerts (PagerDuty for API failures)

### Monitoring
- Incident: RSS feed down → 1hr alert
- Incident: Claude API fails → 30min alert
- Incident: Database query >1s → immediate alert

---

## 7. Resource Requirements

### Infrastructure
| Component | Plan | Cost |
|-----------|------|------|
| Vercel | Pro (serverless) | $20/mo |
| PostgreSQL | Neon (free tier) | Free |
| Redis | Upstash (free tier) | Free |
| Claude API | Pay-as-you-go | ~$50/mo (deferred decision) |
| Yahoo Finance | Free API | Free |
| Google OAuth | Free | Free |

### Team (Recommended)
- 1 Backend Engineer (RSS + Claude + DB)
- 1 Frontend Engineer (React + OAuth)
- 1 QA Engineer (Testing + monitoring)

---

## 8. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| RSS feed reliability | 🔴 High | Fallback to web scraping, circuit breaker pattern |
| Claude API rate limits | 🔴 High | Implement queue system, batch processing |
| Yahoo Finance latency | 🟡 Medium | Accept 15-20min delay, show timestamp clearly |
| Database scalability | 🟡 Medium | Use Neon scaling, implement archival for >30d articles |
| Google OAuth downtime | 🟡 Medium | Cache session tokens 24hrs, graceful degradation |

---

## 9. Next Immediate Steps (Start Days 1-2)

1. **Create GitHub project board** with 50+ issues
2. **Set up backend structure**:
   ```bash
   mkdir -p backend/services backend/db backend/auth
   npm install arctic yahoo-finance2 prisma feedparser
   ```
3. **Initialize database**:
   ```bash
   npx prisma init
   npx prisma db push
   ```
4. **Start RSS aggregation** with top 10 feeds
5. **Create `/api/news` endpoint** that fetches from PostgreSQL instead of mock data

---

## 10. Definition of Done

Phase 1 is complete when:
- ✅ 50+ real news sources active and updating
- ✅ Claude API analyzes each article for beneficiaries
- ✅ Google OAuth users can save preferences
- ✅ KOSPI/KOSDAQ live data displayed in header
- ✅ All beneficiary scores calculated with 5-layer algorithm
- ✅ >85% accuracy validated on 100 test articles
- ✅ Zero TypeScript errors, all linting passes
- ✅ Staging deployment verified
- ✅ Production Vercel deployment live

**Phase 1 Launch Target:** 2 weeks (Days 1-14)

