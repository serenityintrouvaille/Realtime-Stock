# Product Requirements Document
**Product Name:** Realtime-Stock (한국 주식 분석기)
**Subtitle:** AI-Powered Korean Market Intelligence Platform
**Version:** 1.0
**Date:** 2026-03-08
**Author:** AI Product Manager
**Status:** Draft — Ready for Engineering Review

---

## Table of Contents

1. Executive Summary
2. Problem Statement
3. Solution Overview
4. Goals & Success Metrics
5. Target Users & Personas
6. User Stories
7. Functional Requirements
8. Non-Functional Requirements
9. Technical Architecture
10. Data Specifications
11. UX & Design Principles
12. Go-to-Market Strategy
13. Competitive Analysis
14. Phased Roadmap
15. Risks & Mitigations
16. Dependencies & Constraints
17. Open Questions
18. Appendix

---

## 1. Executive Summary

Realtime-Stock (한국 주식 분석기) is a real-time Korean stock market intelligence platform that transforms breaking news into actionable investment insights in under 15 minutes using Claude AI. The platform automatically ingests 250+ Korean and global news sources, identifies direct and indirect beneficiary stocks across 80+ KOSPI/KOSDAQ equities and ETFs, and delivers institutional-grade analysis through a professional seven-tab dashboard inspired by Quartr Finance Research.

The primary users are Korean portfolio managers, fund operators, and sophisticated retail investors who currently lose competitive edge by manually monitoring fragmented news sources. The platform's core differentiation is its multi-layer beneficiary scoring system (0-100 points), 10+ economic scenario analysis engine, and a fully free-to-operate architecture built entirely on zero-cost APIs and open data sources — eliminating the subscription overhead of Bloomberg Terminal or capital.com alternatives.

At scale, the platform targets processing 1,500-2,000 articles per day with greater than 85% accuracy in beneficiary identification, positioning it as the go-to pre-trade research tool for the Korean institutional market.

---

## 2. Problem Statement

### 2.1 User Pain Point

Korean institutional investors and sophisticated retail traders face a structural information velocity problem. Market-moving news — government policy announcements, geopolitical developments, semiconductor export controls, battery material supply disruptions — hits Korean equities within minutes, but the analytical workflow to identify which specific stocks benefit or suffer typically takes 30-120 minutes of manual research across fragmented sources: Naver Finance, KRX disclosures, sector analyst reports, foreign wire services, and regulatory bodies (FSC, FSS, MSIT).

This latency gap is exploitable by algorithmic traders and foreign institutional desks with dedicated research teams. Individual portfolio managers at smaller Korean asset management firms and sophisticated self-directed investors are systematically disadvantaged.

Compounding the problem: there is no single platform that aggregates Korean-language news, regulatory disclosures, and global macro signals simultaneously and maps them to specific KOSPI/KOSDAQ tickers with a scored confidence level. Existing tools either cover only price data (Naver Finance, KRX), only English-language global news (Bloomberg), or require expensive subscriptions that smaller shops cannot justify.

### 2.2 Current Alternatives and Their Inadequacies

| Current Solution | What It Does | Why It Falls Short |
|---|---|---|
| Naver Finance | Price data, basic news aggregation | No AI analysis, no beneficiary identification, Korean news only |
| Bloomberg Terminal | Global news + price data + analytics | $24,000/year/seat, English-first, poor Korean regulatory coverage |
| KRX Official Portal | Regulatory disclosures | No news aggregation, no AI, no beneficiary mapping |
| Capital.com / TradingView | Charts + limited news | No Korean-specific analysis, no sector beneficiary logic |
| Manual Analyst Workflow | Thorough, high-quality | 30-120 min latency, not scalable, human error-prone |
| Telegram/KakaoTalk Channels | Fast, real-time signals | No structured analysis, signal quality unverifiable, no audit trail |

### 2.3 Opportunity Size

- **Korean equity market:** KOSPI + KOSDAQ combined market cap approximately $1.8T USD (2025)
- **Active institutional investors:** approximately 300+ domestic asset management firms, 50+ securities firms with proprietary trading desks
- **Sophisticated retail investors:** estimated 3-5 million active traders in Korea with meaningful portfolio sizes (>50M KRW)
- **Information arbitrage window:** The 15-30 minute gap between news publication and broad market response represents the primary addressable value window

*[ASSUMPTION: Market sizing figures based on KRX 2024 annual statistics and Korea FSC registration data. Actual addressable user count to be validated through user research.]*

---

## 3. Solution Overview

Realtime-Stock solves the information velocity problem through a four-layer pipeline:

**Layer 1 — Ingestion:** Continuous polling of 250+ Korean and global news sources (RSS feeds, web scraping, free APIs) with deduplication and language normalization.

**Layer 2 — AI Analysis:** Claude Sonnet 4.6 processes each article through a structured prompt system that:
- Identifies named entities (companies, sectors, policy areas)
- Maps entities to a curated 80+ stock universe
- Scores beneficiary likelihood (0-100) using multi-factor analysis
- Assigns the article to one of 10+ predefined economic scenarios
- Generates a 3-sentence institutional-grade insight summary

**Layer 3 — Scoring Engine:** A rule-based + AI hybrid scoring system produces direct beneficiary scores, indirect beneficiary scores, and loser scores for each news event, factoring in sector correlation matrices, historical event precedent, and current portfolio positioning.

**Layer 4 — Dashboard:** A professional seven-tab React dashboard with real-time KOSPI/KOSDAQ index display, sector-color-coded visualizations, and exportable research outputs — styled after Quartr Finance Research for institutional credibility.

---

## 4. Goals & Success Metrics

### 4.1 Business Goals

1. Establish product-market fit with Korean institutional and sophisticated retail investor segment within 6 months of public launch
2. Achieve 80%+ daily active user rate among registered users within 3 months of Phase 1 launch
3. Build a defensible data asset (annotated news-to-stock mapping corpus) that creates long-term competitive moat
4. Demonstrate platform viability at zero external API cost, validating the free-source architecture for potential expansion

### 4.2 Product Goals

1. Deliver news-to-analysis latency consistently under 15 minutes, measured end-to-end from article publish time to dashboard appearance
2. Achieve greater than 85% accuracy in top-3 beneficiary stock identification, validated through weekly backtesting against actual 1-day price movements
3. Process 1,500-2,000 articles per day across all 250+ sources with less than 1% data loss
4. Maintain 99.9% dashboard uptime during Korean market hours (08:00-18:00 KST)

### 4.3 Key Performance Indicators

| Metric | Definition | Target (Month 3) | Target (Month 12) |
|---|---|---|---|
| News-to-Analysis Latency (P95) | Time from article publish to scored insight on dashboard | < 15 min | < 10 min |
| Beneficiary Identification Accuracy | % of top-3 picks that move >1% in predicted direction within 1 trading day | > 75% | > 85% |
| Daily Article Volume | Articles ingested, parsed, and AI-analyzed per day | 800+ | 1,500-2,000 |
| DAU/MAU Ratio | Daily active users / Monthly active users | > 60% | > 80% |
| Source Coverage | Active, healthy news sources (< 5% failure rate) | 100+ | 250+ |
| Dashboard Uptime (Market Hours) | Availability 08:00-18:00 KST on trading days | 99.5% | 99.9% |
| Scoring Consistency (Inter-rater) | Correlation between AI scores and expert analyst benchmark scores | > 0.70 Pearson r | > 0.85 Pearson r |

---

## 5. Target Users & Personas

### Persona 1: Jiyeon — Domestic Fund Manager

- **Role:** Portfolio Manager, mid-size Korean asset management firm (AUM 500B-2T KRW)
- **Demographics:** 32-45 years old, finance or economics degree, 8+ years experience, Seoul-based
- **Tech-savviness:** High — uses Bloomberg, Reuters Eikon, and proprietary order management systems daily
- **Goals:**
  - Identify sector rotation opportunities before they are priced in
  - Monitor regulatory news (MSIT, FSC, MoTIE) for policy-driven sector plays
  - Build a defensible pre-trade research trail for compliance review
- **Pain Points:**
  - Current workflow requires 4-6 open browser tabs and 2+ messaging apps simultaneously
  - Korean regulatory announcements are rarely covered by English-language terminals in time
  - Junior analysts produce research with 45-90 minute lag; market moves in 15
- **Usage Scenario:** Jiyeon arrives at her desk at 07:45 KST. She opens Realtime-Stock alongside KRX. A 08:12 MoTIE announcement on expanded battery material subsidies surfaces in the Research Feed tab with beneficiary score 87/100 for POSCO Future M and 74/100 for EcoPro. She cross-checks the Sector Analysis tab for the materials sector heatmap, sees confirmation of sector momentum, and initiates a position before the 09:00 open.

### Persona 2: Minjun — Sophisticated Retail Investor

- **Role:** Self-directed investor, primary occupation in fintech/tech sector
- **Demographics:** 28-40 years old, 100M-500M KRW portfolio, heavy Naver Finance and KakaoTalk channel user
- **Tech-savviness:** Very high — developer background, comfortable with data-heavy interfaces
- **Goals:**
  - Compete with institutional speed without institutional budget
  - Identify multi-day momentum plays from policy and geopolitical news
  - Reduce time spent on manual news monitoring (currently 2-3 hours/day)
- **Pain Points:**
  - Naver Finance aggregation is slow and cluttered with noise
  - KakaoTalk "expert" channels provide signals without reasoning or confidence scores
  - No structured way to assess which stocks benefit from a specific news event
- **Usage Scenario:** Minjun receives a push notification (Phase 2) that a US semiconductor export restriction announcement has been classified as "Beneficiary: Korean domestic fab players" with HYNIX scoring 82/100 and Samsung Electronics 79/100. He opens the Beneficiaries tab, reads the 3-sentence AI summary, checks the ETF tab for KODEX Semiconductor exposure, and adds to his position within 8 minutes.

### Persona 3: Soohyun — Crypto/Fintech Professional Pivoting to Equities

- **Role:** Crypto fund analyst or DeFi protocol operator expanding into Korean equity market
- **Demographics:** 25-35 years old, quantitative or CS background, bilingual (Korean/English)
- **Tech-savviness:** Extremely high — accustomed to real-time dashboards, on-chain analytics tools, Bloomberg-style terminals
- **Goals:**
  - Understand Korean equity market structure quickly using familiar interface patterns
  - Identify macro/regulatory crossover plays (e.g., CBDC policy affecting fintech stocks)
  - Access institutional-grade research without institutional credentials
- **Pain Points:**
  - Korean equity platforms feel outdated compared to DeFi dashboards
  - No equivalent of DeFi Llama or Dune Analytics for Korean stock market news-to-price correlation
  - Language barrier — many Korean regulatory documents are not available in English
- **Usage Scenario:** Soohyun reads a Bank of Korea CBDC pilot expansion announcement. She searches "CBDC" in the Research Feed, finds 3 related articles from the past 48 hours, reviews the beneficiary map showing KB Financial (68/100) and Kakao Pay (71/100), and uses the ETF tab to understand KODEX Financials exposure before taking a position.

---

## 6. User Stories

### Must Have — P0

1. As a fund manager, I want to see a live-updating research feed sorted by publication time and AI confidence score, so that I can prioritize which news events to act on first.

2. As a portfolio manager, I want each news article to display a list of direct beneficiary stocks with numerical scores (0-100), so that I can quickly assess which equities to investigate further.

3. As a retail investor, I want to see which stocks are identified as losers from a given news event with corresponding confidence scores, so that I can consider short-side opportunities or avoid adding to losing positions.

4. As a fund manager, I want to view a real-time KOSPI and KOSDAQ index display on every tab, so that I can contextualize individual news-driven analysis against broader market conditions.

5. As an analyst, I want news articles to be color-coded by sector (semiconductor = blue, battery = green, defense = red, etc.), so that I can visually scan for sector-specific signals at a glance.

6. As a user, I want each article's AI analysis to include a plain-language 3-sentence summary, so that I can quickly understand the investment thesis without reading the full article.

7. As a portfolio manager, I want to view all tracked stocks grouped by sector with their current scoring status, so that I can identify sector-wide trends across multiple simultaneous news events.

8. As a retail investor, I want the dashboard to load and display fresh data within 15 minutes of a news event being published, so that I have a realistic chance of acting before the market fully prices in the information.

### Should Have — P1

9. As a fund manager, I want to filter the research feed by economic scenario (e.g., "US-China Trade Escalation," "Korean Rate Cut," "Defense Spending Increase"), so that I can focus on signals relevant to my current macro thesis.

10. As an analyst, I want to view ETF-level beneficiary analysis showing which ETFs have concentrated exposure to beneficiary stocks, so that I can evaluate diversified exposure options.

11. As a portfolio manager, I want to save a personal watchlist of stocks within the Portfolio tab, so that I can receive prioritized alerts when those specific names appear in beneficiary or loser analysis.

12. As a user, I want to search the research feed by company name, ticker, or keyword, so that I can quickly locate historical analysis on a specific stock or event type.

13. As a sophisticated retail investor, I want to see source credibility ratings for each news article, so that I can weight analysis from high-tier regulatory sources higher than opinion blogs.

### Nice to Have — P2

14. As a fund manager, I want to export a structured JSON or CSV summary of today's top beneficiary stocks and their scores, so that I can feed it into our internal portfolio management system.

15. As an analyst, I want to receive a Slack or Discord notification when a news event produces a beneficiary score above a user-defined threshold (e.g., >80/100) for any stock in my watchlist, so that I do not need to keep the dashboard open continuously.

16. As an institutional user, I want access to a REST API that returns current beneficiary scores and news summaries, so that I can integrate Realtime-Stock data into proprietary trading systems.

17. As a team lead, I want to invite colleagues to a shared workspace where we can annotate news articles with internal commentary, so that our research team can collaborate without leaving the platform.

---

## 7. Functional Requirements

### Module 1: News Ingestion Engine

**Feature 1.1 — RSS Feed Aggregator**
- Description: Continuously polls 100+ RSS feeds from Korean financial news sources, general news sites, and regulatory bodies on a configurable interval (default: 5 minutes)
- Acceptance Criteria:
  - Fetches and parses valid RSS/Atom XML from all configured feed URLs
  - Stores raw article content (title, body, publish datetime, source URL, source name) in PostgreSQL
  - Deduplicates articles using URL fingerprinting and title fuzzy-match (Levenshtein distance < 10)
  - Handles feed failures gracefully; marks source as degraded after 3 consecutive failures; alerts via Sentry
  - Processes at minimum 150 articles per hour during market hours
- Priority: P0
- Dependencies: PostgreSQL schema (articles table), Redis queue

**Feature 1.2 — Web Scraper**
- Description: Scrapes article content from sources without RSS feeds (Korean company IR blogs, Substack newsletters, regulatory portals) using Cheerio/Playwright
- Acceptance Criteria:
  - Successfully extracts article body text from the top 50 non-RSS sources with >90% content completeness
  - Respects robots.txt; implements polite crawl delay (minimum 2 seconds between requests per domain)
  - Handles Korean-language encoding correctly (UTF-8, EUC-KR legacy fallback)
  - Scrape jobs triggered by configurable cron (default: 10-minute interval per source)
- Priority: P0
- Dependencies: Feature 1.1 (shared deduplication logic), Playwright/Cheerio setup

**Feature 1.3 — Article Deduplication & Normalization**
- Description: Central preprocessing pipeline that deduplicates, normalizes encoding, strips HTML, and enriches articles with metadata before queuing for AI analysis
- Acceptance Criteria:
  - Deduplication rate: articles published within 6 hours with >85% token overlap are merged into a single record
  - All article bodies are normalized to UTF-8 Korean text with HTML stripped
  - Publish datetime is normalized to KST (UTC+9)
  - Each article record includes: source_tier (1/2/3), source_language (ko/en/mixed), character_count
- Priority: P0
- Dependencies: Features 1.1, 1.2

### Module 2: AI Analysis Engine

**Feature 2.1 — Claude AI Beneficiary Analysis**
- Description: For each new article, sends a structured prompt to Claude Sonnet 4.6 requesting: entity extraction, beneficiary stock identification (from 80+ stock universe), direct/indirect beneficiary scoring (0-100), scenario classification, and 3-sentence summary
- Acceptance Criteria:
  - Prompt response time: P95 < 8 seconds per article
  - Returns structured JSON with fields: `beneficiaries[]`, `losers[]`, `scenarios[]`, `summary_ko`, `summary_en`, `confidence`
  - Beneficiary list includes ticker symbol, company name, score (0-100), reasoning (1-2 sentences), and benefit_type (direct/indirect)
  - Falls back gracefully on API timeout: marks article as `pending_analysis`, retries up to 3 times with exponential backoff
  - Total Claude API cost per 1,500 articles/day remains within free-tier budget *[ASSUMPTION: Uses Anthropic API with cost monitoring; budget ceiling to be defined by engineering]*
- Priority: P0
- Dependencies: Feature 1.3, Claude API credentials, Stock universe database (Feature 3.1)

**Feature 2.2 — Economic Scenario Classification**
- Description: Each article is classified into one or more of 10+ predefined economic scenarios that map to known market-moving event types in the Korean market
- Acceptance Criteria:
  - Phase 1 supports minimum 5 scenarios: (1) US-China Tech/Trade Escalation, (2) Korean Government Industrial Policy, (3) Global Interest Rate Movement, (4) Defense/Geopolitical Escalation, (5) Battery/EV Supply Chain Disruption
  - Phase 2 expands to 10+ scenarios including: CBDC/Fintech Regulation, Semiconductor Cycle Turn, Real Estate Policy, Energy/Hydrogen Policy, ESG Regulation
  - Each article can be tagged with 1-3 scenarios
  - Scenario tags are displayed on article cards and filterable in the Research Feed
- Priority: P0 (5 scenarios), P1 (10+ scenarios)
- Dependencies: Feature 2.1

**Feature 2.3 — Multi-Layer Beneficiary Scoring**
- Description: Compound scoring system combining AI confidence, source tier weight, historical precedent score, and sector correlation coefficient to produce a final composite beneficiary score
- Acceptance Criteria:
  - Composite score formula: `(AI_score * 0.5) + (source_tier_weight * 0.2) + (historical_precedent * 0.2) + (sector_correlation * 0.1)`, normalized to 0-100
  - Source tier weights: Tier 1 (Regulatory/Major Press) = 1.0, Tier 2 (Established Financial Blogs) = 0.8, Tier 3 (General Blogs/Substack) = 0.6
  - Scores are recalculated if a second corroborating article from a different source arrives within 2 hours
  - Score history is stored; users can see score change over time for a given event
- Priority: P1
- Dependencies: Feature 2.1, Source tier classification (Feature 3.3)

### Module 3: Stock Universe & Data Management

**Feature 3.1 — Korean Stock Universe Database**
- Description: Curated database of 80+ Korean stocks and ETFs across key sectors, enriched with sector tags, market cap tier, and KOSPI/KOSDAQ classification
- Acceptance Criteria:
  - Minimum 80 equities at Phase 1 launch covering: Semiconductors (15+), Batteries/EV (12+), Defense (8+), Finance/Banking (10+), Pharma/Bio (8+), Telecom/Platform (8+), Heavy Industry (6+), ETFs (15+)
  - Each stock record contains: ticker (KRX format), company name (Korean + English), sector, sub-sector, market_cap_tier, index_membership (KOSPI/KOSDAQ/KOSPI200)
  - Stock universe is manually curated at launch; expansion pipeline defined for Phase 2
  - AI analysis references this universe exclusively — no hallucinated tickers
- Priority: P0
- Dependencies: None (seed data)

**Feature 3.2 — Real-time KOSPI/KOSDAQ Index Display**
- Description: Live index values for KOSPI and KOSDAQ displayed persistently in the dashboard header, updated every 60 seconds during market hours
- Acceptance Criteria:
  - Fetches index data from a free data source (KRX open data or Yahoo Finance free endpoint) *[ASSUMPTION: KRX provides free index data via public API; to be validated]*
  - Displays current value, change (points), change (%), and directional arrow (green up / red down)
  - Updates cease automatically outside market hours (09:00-15:30 KST); displays last close value with "Market Closed" indicator
  - Renders in the persistent top navigation bar across all 7 tabs
- Priority: P0
- Dependencies: KRX/Yahoo Finance free API

**Feature 3.3 — Source Tier Classification**
- Description: All 250+ news sources are classified into three tiers based on credibility, institutional authority, and track record
- Acceptance Criteria:
  - Tier 1: Government/Regulatory bodies (FSC, FSS, MSIT, Bank of Korea, KRX, MoTIE), Major wire services (Yonhap, Korea Economic Daily, Maeil Business)
  - Tier 2: Established financial publications (Money Today, Edaily, Fn Guide), Major company IR blogs (Samsung, Hyundai, SK, POSCO)
  - Tier 3: Substack newsletters, independent bloggers, smaller company blogs, international sources
  - Source tier is displayed as a badge on each article card
  - Tier classification stored in source_registry table; editable via Settings tab by admin
- Priority: P1
- Dependencies: Feature 3.1 (source registry table)

### Module 4: Dashboard — 7-Tab Interface

**Feature 4.1 — Research Feed Tab**
- Description: The primary landing tab displaying all ingested and analyzed articles in reverse-chronological order with filtering, search, and sorting capabilities
- Acceptance Criteria:
  - Displays article cards with: headline, source name + tier badge, publish time (relative: "12 minutes ago"), sector color tag, top 3 beneficiary tickers with scores, top loser ticker, scenario tags
  - Supports filtering by: sector, scenario type, source tier, time range (1h, 4h, 1d, 1w)
  - Full-text search across headlines and AI summaries
  - Infinite scroll or pagination (50 articles per page)
  - Click-through to article detail view showing full AI analysis breakdown
  - Auto-refreshes every 60 seconds; shows "N new articles" banner when new content arrives
- Priority: P0
- Dependencies: Features 1.3, 2.1, 2.2

**Feature 4.2 — Beneficiaries Tab**
- Description: Aggregated view of all stocks currently identified as beneficiaries, ranked by composite score, with configurable time window
- Acceptance Criteria:
  - Displays stock cards with: ticker, company name, sector color, current composite beneficiary score, number of supporting articles, score trend (up/down vs. previous period)
  - Time window selector: Last 1h, 4h, 8h, 1d, 3d
  - Sortable by: score (default), article count, alphabetical
  - Clicking a stock opens a detail panel showing all articles contributing to its beneficiary score with individual article scores
  - Sector grouping toggle: view by score rank (default) or grouped by sector
- Priority: P0
- Dependencies: Features 2.1, 2.3, 3.1

**Feature 4.3 — Losers Tab**
- Description: Mirror of the Beneficiaries tab focused on stocks identified as negatively impacted by news events
- Acceptance Criteria:
  - Identical UX pattern to Beneficiaries tab with "loser score" replacing beneficiary score
  - Visual differentiation: red color scheme for loser scores vs. green for beneficiary scores
  - Displays both "direct loser" (explicitly named negative impact) and "indirect loser" (competitive disadvantage, supply chain disruption) categories
- Priority: P0
- Dependencies: Feature 4.2 (shared component pattern)

**Feature 4.4 — Sector Analysis Tab**
- Description: Heatmap and aggregated sector-level view showing which sectors are experiencing the most positive/negative news flow
- Acceptance Criteria:
  - Sector heatmap: color intensity represents net news sentiment score (beneficiary surplus minus loser surplus) for each of 7 sectors
  - Sector drill-down: click a sector to see all stocks within it and their individual scores
  - Time-series mini-chart per sector showing score trend over the past 24 hours
  - Displays article count per sector for the selected time window
- Priority: P0
- Dependencies: Features 3.1, 4.2, 4.3

**Feature 4.5 — Portfolio Tab**
- Description: User-defined watchlist of stocks with personalized score monitoring and alert thresholds
- Acceptance Criteria:
  - Users can add/remove stocks from the 80+ universe to their personal watchlist
  - Watchlist displays current beneficiary/loser scores, most recent relevant article, and score delta since market open
  - Users can set a score threshold per stock; visual alert (color flash) when threshold is crossed
  - Watchlist persists in localStorage (Phase 1) and user account (Phase 2)
  - Maximum 20 stocks in watchlist (Phase 1 constraint) *[ASSUMPTION: No auth in Phase 1; localStorage only]*
- Priority: P1
- Dependencies: Features 4.2, 4.3

**Feature 4.6 — ETF Tab**
- Description: ETF-level analysis showing which ETFs have concentrated exposure to current beneficiary or loser stocks
- Acceptance Criteria:
  - Displays 15+ Korean ETFs (KODEX, TIGER, KBSTAR series) with their current "portfolio impact score" derived from weighted average of constituent stock beneficiary/loser scores
  - Constituent breakdown: click an ETF to see which holdings are driving its score
  - Covers key ETF categories: KOSPI200, semiconductors, batteries/secondary battery, defense, K-finance, bio/pharma
  - ETF constituent weights sourced from public fund disclosure data (updated monthly) *[ASSUMPTION: ETF holdings data available from KRX/KOFIA public disclosures]*
- Priority: P1
- Dependencies: Features 3.1, 4.2

**Feature 4.7 — Settings Tab**
- Description: Platform configuration including source management, notification preferences, display preferences, and data quality monitoring
- Acceptance Criteria:
  - Source Registry: displays all 250+ sources with health status (green/yellow/red), last successful fetch time, article count in last 24h
  - Display: toggle Korean/English AI summaries; toggle sector color scheme
  - Notifications (Phase 2): configure Slack webhook URL, score threshold for alerts
  - Admin panel: add/remove/edit news sources; adjust source tier classification; manually trigger analysis re-run on specific articles
  - API Key Management (Phase 2): generate personal API tokens for programmatic access
- Priority: P1
- Dependencies: Features 1.1, 1.2, 3.3

---

## 8. Non-Functional Requirements

### 8.1 Performance

- Dashboard initial load time: < 2 seconds (P95, measured via Lighthouse) on standard broadband
- Research Feed data refresh: new articles visible on dashboard within 60 seconds of AI analysis completion
- API route response time: P95 < 500ms for all read endpoints; P95 < 2 seconds for analysis trigger endpoints
- Claude AI analysis per article: P95 < 8 seconds; P99 < 15 seconds
- End-to-end latency (publish → dashboard): P90 < 15 minutes, P50 < 8 minutes

### 8.2 Scalability

- Phase 1 target: 50-200 registered users, ~500 daily sessions
- Phase 2 target: 500-2,000 registered users, ~5,000 daily sessions
- Database: PostgreSQL on Neon serverless scales horizontally; Redis on Upstash auto-scales
- Article storage: estimated 2-3 MB/day (text only); 1 GB/year at scale — negligible cost
- Vercel serverless functions auto-scale; no manual capacity planning required for Phase 1-2 user volumes

### 8.3 Security & Privacy

- No user financial data or brokerage credentials are stored
- Phase 1 has no user authentication; all data is read-only public *[ASSUMPTION: Phase 1 is open access, no login required]*
- Phase 2 implements email-based authentication (NextAuth.js or Clerk) with JWT sessions
- Claude API key stored in Vercel environment variables, never exposed to client
- All scraped content is used solely for analysis; original article URLs are displayed to comply with copyright norms
- Korean Personal Information Protection Act (PIPA, 개인정보보호법) compliance required for Phase 2 user data collection
- HTTPS enforced on all endpoints (Vercel default)
- Rate limiting on API routes: 100 requests/minute per IP (Phase 1); per-token limits (Phase 2)

### 8.4 Reliability

- Dashboard uptime SLA: 99.9% during Korean market hours (09:00-15:30 KST, Monday-Friday)
- Ingestion pipeline uptime: 99.5% (allows for scheduled maintenance windows outside market hours)
- Data pipeline failure detection: Sentry alerts within 5 minutes of ingestion failure
- Disaster recovery: Neon PostgreSQL daily automated backups; recovery point objective (RPO) < 24 hours; recovery time objective (RTO) < 4 hours
- Graceful degradation: if Claude API is unavailable, articles are ingested and queued; analysis runs when API recovers

### 8.5 Accessibility

- WCAG 2.1 Level AA compliance
- Sector color coding must include non-color indicator (pattern or label) for color-blind users
- Korean language as primary; English language as secondary toggle
- Minimum font size: 14px for body text, 12px for metadata labels
- Keyboard navigation support for all primary dashboard interactions

### 8.6 Compatibility

- Supported browsers: Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- Minimum viewport: 1280px wide (desktop-first; no mobile optimization in Phase 1)
- Responsive breakpoint for 1440px+ monitors (primary institutional use case — wide-screen dashboards)
- No native mobile app in Phase 1 or Phase 2 (out of scope)

---

## 9. Technical Architecture

### 9.1 Recommended Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React 19 + TypeScript + Tailwind CSS 4.x | Consistent with user's existing expertise; React 19 concurrent features benefit real-time updates |
| Routing/SSR | Next.js 14 App Router | API Routes + SSR for SEO; Vercel-native deployment |
| Styling | Tailwind CSS 4.x + shadcn/ui | Rapid professional UI development; consistent design system |
| Charts | Recharts or Tremor | Korean-market-compatible free charting; Tremor designed for dashboards |
| State Management | React Context + SWR | SWR for server state with auto-revalidation (ideal for 60s refresh pattern) |
| Backend | Next.js 14 API Routes | Unified repo; Vercel serverless deployment |
| Job Scheduler | Vercel Cron Jobs | Built-in; free tier supports 1-minute intervals |
| Database | PostgreSQL on Neon | Serverless Postgres; generous free tier; pgvector support for future semantic search |
| Cache | Redis on Upstash | Serverless Redis; free tier for article deduplication queue and session cache |
| AI | Claude API (Sonnet 4.6) | Multilingual Korean/English capability; structured output JSON mode |
| Web Scraping | Cheerio (static) + Playwright (dynamic) | Cheerio for 80% of sources; Playwright for JS-rendered pages |
| RSS Parsing | rss-parser (Node.js) | Handles RSS 2.0 and Atom; Korean encoding support |
| Monitoring | Sentry + DataDog | Error tracking (Sentry free tier) + metrics (DataDog free tier) |
| Deployment | Vercel | Zero-config Next.js deployment; global CDN; free tier viable for Phase 1 |
| CI/CD | GitHub Actions | Automated testing + Vercel preview deployments on PR |

### 9.2 System Architecture Diagram (Textual)

```
[News Sources: 250+ RSS/Scrape/API]
         |
         v
[Ingestion Workers — Vercel Cron]
   RSS Poller (5min) | Scraper (10min)
         |
         v
[Redis Queue — Upstash]
   Dedup | Normalize | Priority
         |
         v
[AI Analysis Worker — Vercel Cron/Queue]
   Claude Sonnet 4.6 API
   Structured JSON Output
         |
         v
[PostgreSQL — Neon]
   articles | analyses | scores | sources | stocks | etfs
         |
         v
[Next.js API Routes]
   /api/feed | /api/beneficiaries | /api/losers
   /api/sectors | /api/etfs | /api/index
         |
         v
[React Dashboard — 7 Tabs]
   SWR auto-refresh (60s)
   Real-time KOSPI/KOSDAQ header
```

### 9.3 Core Data Model

**Table: articles**
```
id (uuid PK)
source_id (FK → sources)
title (text)
body (text)
url (text, unique)
published_at (timestamptz)
ingested_at (timestamptz)
language (varchar: ko/en/mixed)
status (enum: pending/analyzing/complete/failed)
source_tier (int: 1/2/3)
char_count (int)
```

**Table: analyses**
```
id (uuid PK)
article_id (FK → articles)
analyzed_at (timestamptz)
summary_ko (text)
summary_en (text)
confidence (float 0-1)
scenarios (text[])
raw_claude_response (jsonb)
```

**Table: beneficiary_scores**
```
id (uuid PK)
analysis_id (FK → analyses)
stock_id (FK → stocks)
score (int 0-100)
score_type (enum: direct_beneficiary/indirect_beneficiary/loser)
reasoning (text)
composite_score (float)
```

**Table: stocks**
```
id (uuid PK)
ticker (varchar, KRX format)
name_ko (varchar)
name_en (varchar)
sector (varchar)
sub_sector (varchar)
market_cap_tier (enum: large/mid/small)
index_membership (varchar[])
is_etf (bool)
```

**Table: sources**
```
id (uuid PK)
name (varchar)
url (varchar)
feed_url (varchar)
source_type (enum: rss/scrape/api)
tier (int: 1/2/3)
language (varchar)
last_fetched_at (timestamptz)
health_status (enum: healthy/degraded/dead)
consecutive_failures (int)
```

### 9.4 Key Integrations

| Integration | Purpose | Free Tier Limit | Risk Level |
|---|---|---|---|
| Claude API (Anthropic) | AI article analysis | Pay-per-use; no free tier — budget required | High |
| Neon PostgreSQL | Primary database | 512MB storage, 1 project | Low |
| Upstash Redis | Deduplication cache + queue | 10,000 commands/day (free) | Medium |
| Vercel | Hosting + Cron Jobs | 1-min cron on hobby plan; serverless limits | Medium |
| KRX Open Data API | KOSPI/KOSDAQ index | Free, rate-limited | Medium |
| Yahoo Finance (unofficial) | Index price fallback | Unofficial; risk of breakage | High |
| RSS Feeds (100+) | News ingestion | Free; subject to feed changes | Low |

*[ASSUMPTION: Claude API costs are the only material operating expense. At 1,500 articles/day with ~2,000 tokens/analysis, estimated $18-25/day at Sonnet 4.6 pricing. Budget planning required before Phase 1 launch.]*

---

## 10. Data Specifications

### 10.1 News Source Catalog (250+ Target)

**Tier 1 — Regulatory & Major Wire (20+ sources)**
- Government/Regulatory: FSC (금융위원회), FSS (금융감독원), Bank of Korea (한국은행), KRX (한국거래소), MSIT (과기정통부), MoTIE (산업통상자원부), FTC (공정거래위원회), Ministry of Finance (기재부)
- Major Wire: Yonhap (연합뉴스), Korea Economic Daily (한국경제), Maeil Business (매일경제), JoongAng Ilbo (경제), Chosun Biz

**Tier 2 — Established Financial Media (80+ sources)**
- Korean Financial News: Money Today, Edaily, Fn Guide, Korea Investor, Asia Economy, Seoul Economy
- Company IR Blogs: Samsung, SK Hynix, LG Energy Solution, POSCO Holdings, Hyundai Motor, Kakao, Naver, Krafton, Celltrion, LG Chem
- Research Houses: NH Investment Securities, Mirae Asset, Samsung Securities (public reports only)

**Tier 3 — Substack, Blogs, International (150+ sources)**
- Korean Finance Substack: Multiple independent analyst newsletters
- Global English Sources (Korean market coverage): Korea Herald, KoreaTechDesk, The Korea Times Business
- Global Macro (indirect relevance): Bankless (crypto/macro), Stratechery (tech policy), Doomberg (energy)

### 10.2 Stock Universe (80+ equities — Phase 1)

**Semiconductors (15 stocks)**
Samsung Electronics (005930), SK Hynix (000660), DB HiTek (000990), Leeno Industrial (058470), KSOE (009540), Hana Microdisplay, SFA Semiconductor, Wonik IPS, Tokai Carbon Korea, Jusung Engineering, Eugene Technology, Techwing, Nepes, SEMES (unlisted — exclude), Hanmi Semiconductor

**Secondary Battery / EV (12 stocks)**
LG Energy Solution (373220), Samsung SDI (006400), SK Innovation (096770), POSCO Future M (003670), EcoPro (086520), EcoPro BM (247540), L&F (066970), Iljin Materials (020150), Chunbo (278280), Narae Nanotech, Korea Zinc (010130), LS Materials

**Defense (8 stocks)**
Hanwha Aerospace (012450), Hyundai Rotem (064350), LIG Nex1 (079550), Victek (065130), Poongsan (103140), Huneed Technologies (005870), SNT Holdings, Korean Air (003490)

**Finance / Banking (10 stocks)**
KB Financial (105560), Shinhan Financial (055550), Hana Financial (086790), Woori Financial (316140), NH Investment Securities (005940), Mirae Asset Securities (006800), Samsung Life (032830), Kakao Bank (323410), Kakao Pay (377300), Kiwoom Securities (039490)

**Pharma / Bio (8 stocks)**
Samsung Biologics (207940), Celltrion (068270), Yuhan (000100), Boryung Pharmaceutical (003850), HLB (028300), OliX Pharmaceuticals, Hugel, Alteogen

**Telecom / Platform (8 stocks)**
SK Telecom (017670), KT Corp (030200), LG Uplus (032640), Naver (035420), Kakao (035720), Krafton (259960), NCSoft (036570), Pearl Abyss (263750)

**Heavy Industry / Construction (6 stocks)**
Hyundai Heavy Industries (009540), Samsung Heavy Industries (010140), Doosan Enerbility (034020), GS Engineering (006360), Hyundai Engineering & Construction (000720), DL E&C (375500)

**ETFs (15+)**
KODEX 200, KODEX Semiconductor, KODEX Secondary Battery, KODEX Defense, KODEX Financials, TIGER 200, TIGER Semiconductor, TIGER Secondary Battery, TIGER Defense, KBSTAR Semiconductor, KODEX Biotech, TIGER China Electric Vehicles, KODEX US Tech, TIGER NASDAQ100, KODEX K-defense

### 10.3 Economic Scenario Taxonomy

| Scenario ID | Name | Trigger Events | Primary Beneficiary Sectors | Primary Loser Sectors |
|---|---|---|---|---|
| S01 | US-China Tech/Trade Escalation | Export controls, tariff announcements, sanctions | Korean fab equipment, domestic chips | Korean exporters to China |
| S02 | Korean Government Industrial Policy | MoTIE subsidy, tax credit, strategic sector designation | Targeted sector | Competing sectors for budget |
| S03 | Global Rate Movement | Fed decision, BOK rate change, ECB signal | Finance (rate hike), Growth stocks (rate cut) | Opposite of above |
| S04 | Defense/Geopolitical Escalation | Korean peninsula tension, NATO expansion, conflict outbreak | Defense, Cybersecurity | Tourism, Consumer |
| S05 | EV/Battery Supply Chain | Lithium price, IRA policy, OEM EV announcement | Battery materials, cell makers | ICE auto parts |
| S06 | Semiconductor Cycle | Memory price index (DRAM/NAND), foundry utilization | Samsung, Hynix, equipment | Consumer electronics |
| S07 | Fintech/CBDC Regulation | FSC fintech sandbox, CBDC pilot, crypto regulation | Kakao Bank, Kakao Pay, KB | Traditional banking (if disintermediated) |
| S08 | Energy/Hydrogen Policy | Renewable energy targets, hydrogen roadmap, nuclear policy | Doosan Enerbility, GS, wind/solar names | Coal, oil-adjacent |
| S09 | ESG/Carbon Regulation | Korea NDC update, EU CBAM, ESG disclosure mandates | Green tech, ESG ETFs | Heavy emitters (steel, chemicals) |
| S10 | Global Tech Cycle | AI capex cycle, hyperscaler earnings, semiconductor demand | SK Hynix (HBM), Samsung, Naver AI | Mature tech, legacy hardware |

---

## 11. UX & Design Principles

### 11.1 Core Design Principles

1. **Information Density Over Decoration:** Every pixel earns its place. The dashboard prioritizes data completeness — inspired by Bloomberg Terminal and Quartr Finance Research — over whitespace aesthetics. Institutional users expect dense, scannable layouts.

2. **Speed Signals Trust:** Latency indicators, "updated X minutes ago" timestamps, and loading states must be visible and accurate. Users must always know the freshness of the data they are acting on.

3. **Color as Semantic Signal:** Sector colors and score colors (green = beneficiary, red = loser, amber = neutral) are used consistently and exclusively to convey meaning — not decoration. A consistent color system is published in the design spec.

4. **Progressive Disclosure:** Article cards surface the headline, top 3 scores, and sector tag. The detail panel reveals the full AI analysis, supporting articles, and score breakdown. Users are never overwhelmed at first glance.

5. **Korean-First Localization:** All UI copy, AI summaries, and error messages default to Korean. English toggle is available. Date/time formats follow Korean convention (YYYY년 MM월 DD일). Market conventions (KOSPI tickers, sector names) use Korean standard terminology.

### 11.2 Key User Flows

**Flow 1: Morning Market Preparation (Primary Use Case)**
1. User opens dashboard at 07:45-08:30 KST
2. Research Feed tab loads, showing overnight news (sorted by AI confidence score)
3. User scans article cards, filters by "High Confidence (>70)" and "Tier 1 Sources"
4. User clicks top article: "Ministry of Defense confirms 2T KRW additional defense procurement budget"
5. Detail panel opens: AI summary (3 sentences), beneficiary scores (Hanwha Aerospace 91/100, LIG Nex1 85/100), scenario tag "S04 - Defense Escalation"
6. User navigates to Beneficiaries tab, filters to Defense sector
7. User sees Hanwha Aerospace at top with composite score 91/100, 3 supporting articles
8. User cross-checks ETF tab: KODEX Defense shows portfolio impact score 78/100
9. User adds Hanwha Aerospace to Portfolio watchlist for intraday monitoring
10. Total time from dashboard open to investment decision input: < 5 minutes

**Flow 2: Breaking News Response (Core Differentiation)**
1. 10:23 KST: New article ingested — Yonhap reports US Commerce Dept expands HBM export restrictions
2. RSS poller picks up article within 5 minutes of publish
3. Claude analysis completes within 8 seconds: SK Hynix 88/100 indirect beneficiary (domestic consolidation), Samsung Electronics 72/100, Micron as primary loser (US company — out of universe)
4. Score posted to database; SWR on dashboard detects new data in 60-second poll
5. Research Feed shows "1 New Article" banner; user clicks
6. Breaking article surfaces at top of feed with red "BREAKING" tag and scenario "S01 - US-China Tech Escalation" + "S10 - Global Tech Cycle"
7. User reviews beneficiaries, clicks SK Hynix detail, sees 2 additional corroborating articles from past 2 hours that raised composite score from 72 to 88
8. Total time from publish to informed user action: 7-12 minutes (well within 15-minute SLA)

**Flow 3: Sector Rotation Monitoring**
1. User opens Sector Analysis tab at midday
2. Heatmap shows Battery/EV sector at -42 net score (most negative) and Defense at +67 (most positive)
3. User clicks Battery/EV cell: drill-down shows LG Energy Solution at -68/100 loser score, EcoPro at -55/100
4. User reviews Losers tab filtered to Battery: 5 articles in past 4 hours referencing EU EV target rollback
5. User reduces position in battery names; adds to defense ETF position
6. Total time: < 10 minutes

### 11.3 UI Layout Specification

```
+----------------------------------------------------------+
| HEADER: Logo | KOSPI: 2,847.3 (+1.2%) | KOSDAQ: 892.1  |
|              | (-0.4%) | Last Updated: 10:42 KST         |
+----------------------------------------------------------+
| NAV TABS: [Research Feed] [Beneficiaries] [Losers]       |
|           [Sector Analysis] [Portfolio] [ETF] [Settings] |
+----------------------------------------------------------+
|                                                          |
|  FILTER BAR: Sector | Scenario | Source Tier | Time Range|
|  SEARCH: [___________________________]                   |
|                                                          |
|  ARTICLE CARD:                                           |
|  [SECTOR BADGE] Headline text (Korean)                   |
|  Source Name [TIER 1] | 12 min ago                      |
|  Beneficiaries: HYNIX 88 | SAMSUNG 72 | POSCO 61        |
|  Losers: None | Scenario: S01, S10                       |
|  [Read Full Analysis >]                                  |
|                                                          |
+----------------------------------------------------------+
```

---

## 12. Go-to-Market Strategy

### 12.1 Launch Strategy

**Closed Beta (Month 1-2 of Phase 1):**
- Invite 20-50 beta users: mix of mid-size asset management professionals, fintech researchers, and sophisticated retail investors sourced through developer and finance communities (Okky, Disquiet, LinkedIn KR finance groups)
- Weekly feedback sessions; track accuracy of beneficiary calls against actual price movements
- No public announcement; focus on product quality validation

**Open Beta (End of Phase 1 / Month 3):**
- Public launch via Product Hunt Korea, LinkedIn, FinanceTwitter Korea (X)
- Target 200-500 registered users within first 30 days
- Launch article on Naver Blog / Brunch.co.kr targeting "주식 투자" and "AI 주식 분석" keywords

**General Availability (Phase 2 onwards):**
- Press outreach to Korea Economic Daily, Maeil Business, Money Today
- Consideration of university finance club partnerships (Seoul National University Investment Club, Yonsei Finance Society)
- Potential demo at Korea Fintech Week

### 12.2 Pricing Model

**Phase 1-2: Fully Free**
- The platform operates on free data sources and is offered at no cost
- Core strategy: build user base and data corpus before introducing monetization

**Phase 3 Monetization Options (to be evaluated):**
- Freemium: Free tier (basic research feed, 3 watchlist stocks) vs. Pro tier ($29/month: full access, alerts, API)
- API Access: Institutional API at $299/month for programmatic access to scored beneficiary data
- White-label: Offer analytics engine to securities firms or robo-advisors

*[ASSUMPTION: Monetization is deferred to Phase 3; Phase 1-2 focus entirely on product-market fit and user acquisition.]*

### 12.3 Distribution Channels

1. Korean fintech and investment communities: Okky, Disquiet, Blind (finance professionals)
2. Social media: X (FinanceKorea hashtags), LinkedIn Korean finance groups, KakaoTalk open channels
3. SEO: Korean-language content targeting "AI 주식 분석", "뉴스 수혜주 분석", "KOSPI 실시간 분석"
4. Developer communities: GitHub, Dev.to Korea — open-sourcing the source registry component
5. Word of mouth: institutional users sharing breakdowns within investment team networks

---

## 13. Competitive Analysis

| Competitor | Core Offering | Strengths | Weaknesses | Our Differentiation |
|---|---|---|---|---|
| Naver Finance | Korean stock prices, basic news aggregation | Dominant market share, free, mobile-first, Korean-native | No AI analysis, no beneficiary identification, news is generic aggregation | AI-powered beneficiary scoring + scenario classification |
| Bloomberg Terminal | Global news + analytics + price data | Industry standard, comprehensive, real-time | $24,000/year, English-first, poor Korean regulatory depth, steep learning curve | Free, Korean-first, news-to-beneficiary pipeline in <15 min |
| Fn Guide | Korean financial data, analyst reports | Strong Korea-specific financial data | Report-centric, not real-time, no automated news analysis | Real-time ingestion + AI scoring, no manual steps |
| TradingView | Charts + news + community ideas | Excellent charting, global community, social features | Weak Korean regulatory news, no beneficiary identification, subscription for advanced features | Institutional research depth, regulatory source coverage, beneficiary scoring |
| Quartr | Earnings call transcripts, IR materials for global companies | Clean institutional UI, AI transcription, investor-grade content | Not Korea-focused, no news-to-stock scoring, earnings-centric | Korean market specialization, breaking news focus, beneficiary engine |
| StockNewsAPI / AlphaVantage | Programmatic news and price data | Developer-friendly APIs | No Korean sources, no analysis layer, raw data only | Full analysis layer + dashboard; no coding required for end users |

---

## 14. Phased Roadmap

### Phase 1 — MVP Foundation (Months 1-3)

**Goal:** Core ingestion, AI analysis, and 7-tab dashboard functional with 50+ sources and 80 stocks.

**Engineering Priorities:**
- [ ] Project repository setup (Next.js 14 monorepo, TypeScript, Tailwind CSS 4.x)
- [ ] PostgreSQL schema design and Neon database provisioning
- [ ] Redis (Upstash) connection and deduplication queue setup
- [ ] GitHub Actions CI/CD pipeline with Vercel preview deployments
- [ ] RSS Feed Aggregator (Feature 1.1) — 50+ feeds validated and active
- [ ] Web Scraper (Feature 1.2) — Top 20 non-RSS sources functional
- [ ] Article deduplication and normalization pipeline (Feature 1.3)
- [ ] Claude AI beneficiary analysis integration (Feature 2.1)
- [ ] 5 economic scenario classification (Feature 2.2, Phase 1 subset)
- [ ] Korean stock universe database seed (80+ stocks, 15 ETFs) (Feature 3.1)
- [ ] KOSPI/KOSDAQ real-time index display (Feature 3.2)
- [ ] Research Feed Tab — full functionality (Feature 4.1)
- [ ] Beneficiaries Tab — full functionality (Feature 4.2)
- [ ] Losers Tab — full functionality (Feature 4.3)
- [ ] Sector Analysis Tab — heatmap + drill-down (Feature 4.4)
- [ ] Portfolio Tab — localStorage watchlist (Feature 4.5)
- [ ] ETF Tab — 15 ETFs with constituent scoring (Feature 4.6)
- [ ] Settings Tab — source health monitoring (Feature 4.7)
- [ ] Sentry error monitoring integration
- [ ] Closed beta launch with 20-50 users

**Phase 1 Exit Criteria:**
- End-to-end latency P90 < 15 minutes demonstrated over 5 consecutive trading days
- 500+ articles processed per day with < 2% analysis failure rate
- All 7 dashboard tabs functional with no P0 bugs
- Beneficiary accuracy > 65% (as measured by 1-day price movement validation, lower bar for MVP)

### Phase 2 — Growth & Depth (Months 4-6)

**Goal:** Expand to 250+ sources, 10+ scenarios, multi-layer scoring, alerts, and user accounts.

- [ ] Source expansion to 250+ (Substack gurus, company IR blogs, international feeds)
- [ ] Expand economic scenarios to 10+ (Feature 2.2, full)
- [ ] Multi-layer composite scoring system (Feature 2.3)
- [ ] Source tier classification system (Feature 3.3)
- [ ] User authentication (NextAuth.js or Clerk) with PIPA-compliant data handling
- [ ] Portfolio Tab — server-side watchlist with user accounts (Feature 4.5 upgrade)
- [ ] Real-time Slack / Discord alert webhooks (User Story 15)
- [ ] Advanced analytics: 7-day trend charts per stock and sector
- [ ] Article search with full-text PostgreSQL search
- [ ] Accuracy backtesting dashboard (internal tool for weekly calibration)
- [ ] DataDog metrics integration (ingestion rate, analysis latency, error rate)
- [ ] Open Beta launch; target 500 registered users

**Phase 2 Exit Criteria:**
- 250+ active sources with < 5% failure rate
- Beneficiary accuracy > 80% sustained over 30 days
- DAU/MAU ratio > 60%
- Alert system delivering Slack notifications within 2 minutes of score threshold breach

### Phase 3 — Scale & Monetization (Months 7-12)

**Goal:** Institutional-grade reliability, API productization, monetization exploration, and advanced analytics.

- [ ] REST API for programmatic beneficiary score access (User Story 16)
- [ ] Multi-user workspace with team annotation (User Story 17)
- [ ] Semantic search using pgvector embeddings (find articles by meaning, not keyword)
- [ ] Historical data analysis: query beneficiary patterns for past events (e.g., "show me all articles that triggered >80 score for defense sector in 2025")
- [ ] Export functionality (JSON/CSV) for daily top beneficiaries (User Story 14)
- [ ] Backtesting dashboard: visualize how past AI calls correlated with actual price movements
- [ ] Pricing model implementation (Freemium Pro tier at $29/month)
- [ ] Institutional API tier launch ($299/month)
- [ ] Mobile-responsive redesign (not native app, but usable on tablet)
- [ ] Korean language NLP fine-tuning for regulatory document analysis
- [ ] Performance optimization: target P90 latency < 8 minutes (down from 15-minute Phase 1 SLA)
- [ ] SLA documentation and status page for institutional clients

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| Claude API Cost Overrun | High | High | Implement per-article cost tracking; set daily spend cap via Anthropic API; cache identical article analyses; tier articles by source importance (only Tier 1+2 get immediate analysis; Tier 3 batched) |
| RSS Feed Instability (source changes structure/URL) | High | Medium | Automated health monitoring with Sentry alerts; weekly manual source audit; fallback to Wayback Machine CDX API for dead feeds; redundant sources for high-priority domains |
| KRX/Yahoo Finance API Breakage (KOSPI data) | Medium | Medium | Implement 3 fallback sources for index data: KRX primary, Yahoo Finance secondary, Naver Finance scrape tertiary; cache last known value with staleness indicator |
| Beneficiary Accuracy Below Acceptable Threshold | Medium | High | Weekly backtesting cycle; prompt engineering iteration; human-in-the-loop correction workflow in Settings admin panel; publish accuracy metrics publicly to build trust through transparency |
| Vercel Free Tier Limits Exceeded | Medium | High | Monitor function invocation and bandwidth usage weekly; prepare migration path to Vercel Pro ($20/month); design cron jobs to be idempotent and batchable to reduce invocation count |
| Claude API Rate Limiting During High-Volume News Events | Medium | High | Implement Redis-based priority queue; Tier 1 sources get immediate processing; burst handling with exponential backoff; pre-allocate higher rate limit via Anthropic enterprise plan if needed |
| Copyright/Scraping Legal Risk | Low | High | Display only article summaries and links (not full text); comply with robots.txt; implement crawl delays; avoid scraping behind paywalls; consult Korean internet law (저작권법) before Phase 2 expansion |
| Korean Regulatory Data Access Restrictions | Low | Medium | Prioritize official RSS feeds and public disclosure portals (DART, KRX); avoid scraping government portals that prohibit it; build relationships with data providers for formal API access in Phase 3 |
| User Mistrust of AI Accuracy (Liability Concern) | Medium | High | Display prominent "For Research Purposes Only — Not Investment Advice" disclaimer in Korean and English; show AI confidence score alongside all recommendations; publish methodology documentation |
| Competitor Copies Core Features | Low | Medium | Build moat through proprietary annotated dataset (news-to-outcome corpus); focus on Korean-specific depth (regulatory source coverage) that global competitors cannot replicate quickly |

---

## 16. Dependencies & Constraints

### External Dependencies

- **Anthropic Claude API:** Core dependency; no alternative AI provider currently planned. Outage directly impacts analysis pipeline. Mitigation: queue articles during outage, process on recovery.
- **Neon PostgreSQL:** Database hosting. Free tier limits: 512MB storage, 1 project, 1 branch. Must upgrade ($19/month) when article volume exceeds storage limit (~6 months at current projections).
- **Upstash Redis:** Deduplication and queue. Free tier: 10,000 commands/day. At 1,500 articles/day with ~5 Redis ops/article = 7,500 commands/day. Adequate for Phase 1; monitor for Phase 2.
- **KRX Open Data Portal:** KOSPI/KOSDAQ index data. Free but requires registration and rate limit compliance. Fallback sources required.
- **Vercel:** Hosting and Cron Jobs. Free hobby tier allows 1 cron job; Vercel Pro ($20/month) required for multiple cron jobs and higher function limits.
- **RSS Feed Availability:** 50+ feeds in Phase 1 assumed stable. Real-world feed churn is approximately 15-20% annually; ongoing maintenance required.

### Internal Constraints

- *[ASSUMPTION: Development team is 1-2 developers (solo or small team); timeline estimates calibrated accordingly]*
- *[ASSUMPTION: No dedicated DevOps resource; infrastructure must be fully managed/serverless]*
- *[ASSUMPTION: Total operating budget is < $200/month for all paid services, including Claude API]*
- Korean language proficiency required in development team for prompt engineering and QA of AI outputs
- No mobile development resources allocated; web-responsive is the maximum mobile investment

### Assumptions Summary

1. *[ASSUMPTION: Claude API is the only paid external service; all others are on free tiers]*
2. *[ASSUMPTION: Phase 1 has no user authentication; all data is publicly readable]*
3. *[ASSUMPTION: KRX provides accessible public API for KOSPI/KOSDAQ index data]*
4. *[ASSUMPTION: ETF constituent holdings are available from KOFIA or KRX public disclosures]*
5. *[ASSUMPTION: Legal review of web scraping practices is conducted before Phase 2 source expansion to 250+]*
6. *[ASSUMPTION: Beneficiary accuracy is validated weekly by manually checking top-5 calls against T+1 price data; no automated backtesting in Phase 1]*
7. *[ASSUMPTION: Phase 1 targets Korean domestic market only; global investor user interface (English-primary) deferred to Phase 3]*

---

## 17. Open Questions

1. **Claude API Budget Cap:** What is the maximum acceptable monthly Claude API spend? At 1,500 articles/day and approximately $0.012-0.015 per analysis (Sonnet 4.6 pricing as of Q1 2026), monthly cost is approximately $540-675. Is this within budget, or should we implement aggressive Tier 3 source filtering to reduce volume? This decision gates the entire ingestion architecture.

2. **Beneficiary Accuracy Validation Methodology:** How should we measure and report beneficiary accuracy? Options include: (a) T+1 price movement >1% in predicted direction, (b) T+5 price movement >2%, (c) expert analyst benchmark scoring. The chosen methodology directly determines how we tune the AI prompt and composite scoring formula.

3. **Korean Regulatory Web Scraping Legality:** Do the government portals (FSC, MSIT, MoTIE) permit automated scraping of their press release pages, or must we rely solely on official RSS feeds? Some Korean government sites prohibit scraping in their terms of service. Legal review required before Phase 2 source expansion.

4. **KOSPI/KOSDAQ Real-time Data Source:** The KRX official API requires business registration for real-time data access. What is the acceptable data latency for index display — true real-time (< 1 min), delayed 15 minutes (free via Yahoo Finance), or delayed 20 minutes (free via KRX public portal)? This affects both UX and legal compliance.

5. **Phase 1 User Authentication Decision:** The current plan defers user accounts to Phase 2. However, without auth, there is no email capture for follow-up communication and no way to offer personalized watchlists server-side. Should we implement lightweight email-based auth from day one, or strictly defer to Phase 2 to maintain Phase 1 simplicity?

6. **Stock Universe Expansion Criteria:** The Phase 1 universe is 80 stocks selected manually. What criteria govern expansion in Phase 2? Options include: market cap threshold (KOSPI200 inclusion), trading volume minimum, or user request voting. This determines the curation process and the scalability of the AI analysis prompt (larger universe = longer prompts = higher cost).

7. **Competitor Notification Risk:** If this platform gains traction, it could attract attention from established players (Naver, Fn Guide, large securities firms). Is there a strategy to manage competitive response — such as open-sourcing the source registry, building community, or pursuing formal partnerships with data providers before competitors can replicate the core feature set?

---

## Appendix

### A. Glossary

| Term | Definition |
|---|---|
| KOSPI | Korea Composite Stock Price Index — main Korean stock market index (blue-chip, large-cap) |
| KOSDAQ | Korea Securities Dealers Automated Quotation — secondary Korean market (tech, growth) |
| KRX | Korea Exchange — the operator of KOSPI and KOSDAQ |
| FSC | Financial Services Commission (금융위원회) — Korean financial regulatory authority |
| FSS | Financial Supervisory Service (금융감독원) — Korean financial supervision body |
| MoTIE | Ministry of Trade, Industry and Energy (산업통상자원부) |
| MSIT | Ministry of Science and ICT (과학기술정보통신부) |
| DART | Data Analysis, Retrieval and Transfer System — KRX public disclosure system |
| Beneficiary Stock | A stock expected to experience positive price movement as a direct or indirect consequence of a news event |
| Loser Stock | A stock expected to experience negative price movement as a direct or indirect consequence of a news event |
| Composite Score | The weighted aggregate score (0-100) combining AI confidence, source tier, historical precedent, and sector correlation for a beneficiary/loser classification |
| Tier 1/2/3 Source | Classification of news source credibility: Tier 1 = regulatory/major wire, Tier 2 = established financial media, Tier 3 = blogs/newsletters/international |
| SWR | Stale-While-Revalidate — a React data-fetching pattern used for 60-second auto-refresh in the dashboard |
| IRA | US Inflation Reduction Act — major US policy affecting Korean battery and EV supply chains |
| HBM | High Bandwidth Memory — advanced memory chip type produced by SK Hynix and Samsung |
| PIPA | Personal Information Protection Act (개인정보보호법) — Korea's primary data privacy law |

### B. References

- KRX Annual Statistics 2024 (krx.co.kr)
- Korea FSC Annual Report 2024 (fsc.go.kr)
- Anthropic Claude API Documentation (docs.anthropic.com) — Sonnet 4.6 pricing and capabilities
- Quartr Finance Research Dashboard (quartr.com) — UX reference for institutional design patterns
- Neon PostgreSQL Documentation (neon.tech) — free tier specifications
- Upstash Redis Documentation (upstash.com) — free tier command limits
- Vercel Platform Limits (vercel.com/docs/limits) — Hobby vs. Pro tier comparison
- Korea Personal Information Protection Act (개인정보보호법) — Ministry of the Interior and Safety

---

**Document End**

**Recommended Clarifications (Top 3 for Immediate Resolution):**

1. **Claude API Budget:** Confirm the acceptable monthly Claude API spend ceiling before any architecture work begins — this is the single most important financial constraint for the entire platform.

2. **Index Data Source:** Confirm whether delayed (15-20 min) KOSPI/KOSDAQ data is acceptable for Phase 1, or whether real-time data access (requiring KRX business registration) is required for MVP.

3. **Phase 1 Authentication:** Decide before sprint 1 whether to include lightweight email auth in Phase 1 or strictly defer — this decision affects the database schema, deployment environment variables, and the Portfolio Tab implementation.
