# Phase 1 Quick Start Guide - Team Collaboration

## 🎯 Mission: Transform PoC → Production MVP (14 days)

**Current State:** 10 mock articles, hardcoded beneficiaries, no auth
**Target State:** 50+ real news sources, AI analysis, Google OAuth, live KOSPI/KOSDAQ

---

## 📋 Critical Decision Points (Already Made ✅)

| Decision | Choice | Team Impact |
|----------|--------|-------------|
| **Claude API Budget** | Deferred (start free) | No cost until scale-up phase |
| **KOSPI/KOSDAQ Data** | Yahoo Finance (15-20min delay) | No additional costs, free API |
| **User Authentication** | Google OAuth only (Phase 1) | Fastest auth path, single-sign-on |

---

## 🗺️ Phase 1 Work Breakdown

### Week 1: Foundation (Days 1-7)

**Track 1: Data Pipeline** (Backend Engineer)
- [ ] Task #2: RSS aggregation (50+ feeds) - Days 1-3
- [ ] Task #3: PostgreSQL schema - Days 1-2
- [ ] Task #4: Claude API analysis engine - Days 4-6
- [ ] Task #6: Yahoo Finance integration - Days 5-7

**Track 2: User Experience** (Frontend Engineer)
- [ ] Task #5: Google OAuth setup - Days 3-5
- [ ] Task #8: Update API endpoints - Days 7-8
- [ ] Integrate live indices in header
- [ ] Add login/logout UI

**Track 3: Quality Assurance** (QA Engineer)
- [ ] Task #9: Testing & QA - Days 9-12
- [ ] Task #10: Staging deployment - Days 10-12
- [ ] Task #11: Production go-live - Days 13-14

### Week 2: Validation & Launch (Days 8-14)

- [ ] Deploy to staging
- [ ] Run 100 real articles through analysis
- [ ] Validate >85% beneficiary accuracy
- [ ] Performance benchmarks
- [ ] User acceptance testing
- [ ] Production deployment

---

## 🔧 Technology Stack (Reconfirmed)

```
Frontend:  React 19 + TypeScript + Tailwind CSS 4.x
Backend:   Node.js (Vercel Serverless)
Database:  PostgreSQL (Neon - free)
Cache:     Redis (Upstash - free)
Auth:      Google OAuth 2.0
AI:        Claude Sonnet 4.6 API
Data:      RSS Parser + Yahoo Finance API (free)
```

---

## 📊 Success Metrics

### Data Quality (Days 1-8)
- [ ] >50 RSS feeds integrated and parsing
- [ ] <300 sec news-to-analysis latency
- [ ] >85% accuracy on beneficiary predictions
- [ ] <2% duplicate article rate

### User Experience (Days 3-12)
- [ ] 100% UI in Korean language
- [ ] Live KOSPI/KOSDAQ display with timestamps
- [ ] Google OAuth login functional
- [ ] <3 sec page load time

### System Health (Days 9-14)
- [ ] Zero downtime on RSS aggregation
- [ ] <100ms PostgreSQL queries
- [ ] >95% Redis cache hit rate
- [ ] <500ms API response times

---

## 📦 Deliverables Checklist

### Code Deliverables
- [ ] `backend/services/rss-aggregator.ts` (RSS feeds)
- [ ] `backend/services/analysis-engine.ts` (Claude API)
- [ ] `backend/services/stock-data.ts` (Yahoo Finance)
- [ ] `backend/auth/google.ts` (OAuth)
- [ ] `backend/db/schema.prisma` (Database)
- [ ] `app/page.tsx` updated with auth
- [ ] `/api/news` endpoint (real data)
- [ ] `/api/stocks` endpoint (real data)
- [ ] `/api/indices` endpoint (live KOSPI/KOSDAQ)
- [ ] `/api/auth/google/callback` endpoint

### Configuration
- [ ] `.env.local` with all secrets
- [ ] Prisma migrations created
- [ ] GitHub Actions CI/CD configured
- [ ] Vercel staging deployment
- [ ] Vercel production deployment

### Documentation
- [ ] API endpoint documentation
- [ ] Database schema diagram
- [ ] OAuth flow diagram
- [ ] Incident response runbook
- [ ] Team onboarding guide

---

## 🚀 Daily Standup Template

**Format:** 5 min/person × 3 team members = 15 min total

```
Backend Engineer:
- What I did today
- What I'm doing tomorrow
- Blockers (RSS API limits, Claude rate limits, etc.)

Frontend Engineer:
- What I did today
- What I'm doing tomorrow
- Blockers (API integration, styling, etc.)

QA Engineer:
- Tests running
- Coverage %
- Blockers (test environment setup, etc.)
```

---

## ⚠️ Top 10 Risks & Mitigations

| # | Risk | Severity | Mitigation |
|---|------|----------|-----------|
| 1 | RSS feeds go down | 🔴 | Circuit breaker pattern + email alerts |
| 2 | Claude API rate limits | 🔴 | Queue system, batch processing |
| 3 | Database scalability | 🟡 | Neon auto-scaling, archival strategy |
| 4 | Yahoo Finance latency varies | 🟡 | Show timestamp, cache aggressively |
| 5 | Google OAuth failures | 🟡 | Session token cache, graceful fallback |
| 6 | Duplicate articles | 🟡 | MD5 hash deduplication, fuzzy matching |
| 7 | Inaccurate beneficiary scores | 🔴 | Backtesting framework, human validation |
| 8 | Missing Korean font rendering | 🟡 | Already added Noto Sans KR |
| 9 | Staging data → Production leak | 🟡 | Separate DBs, automated cleanup |
| 10 | Poor mobile performance | 🟡 | Lighthouse testing, lazy loading |

---

## 💬 Communication Channels

```
Daily Sync:     10 AM (15 min)
Code Reviews:   Async (GitHub PR comments)
Issues:         GitHub Issues with labels
Documentation:  This repo wiki
Escalations:    Slack #realtime-stock-phase1
```

---

## 📅 Phase 1 Timeline

```
Week 1 (Days 1-7):   Foundation + API Integration
├─ Days 1-3:  RSS + Database setup
├─ Days 4-6:  Claude API + OAuth
└─ Days 5-7:  Yahoo Finance + Final APIs

Week 2 (Days 8-14):  Testing + Deployment
├─ Days 9-10: Comprehensive testing suite
├─ Days 11-12: Staging validation
└─ Days 13-14: Production launch
```

---

## 🎓 Learning Resources for Team

### Claude API
- [Claude API Docs](https://docs.anthropic.com/)
- [Best Practices for Analysis](https://docs.anthropic.com/en/docs/build-a-resource-generator)
- Budget: Start free tier, scale after validation

### OAuth / Authentication
- [Arctic OAuth Library](https://arc.net/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

### Database
- [Prisma ORM Docs](https://www.prisma.io/docs/)
- [Neon PostgreSQL](https://neon.tech/docs)
- [Redis Caching Patterns](https://redis.io/docs/)

### RSS / Data Collection
- [Feedparser Library](https://www.npmjs.com/package/feedparser)
- [Yahoo Finance API](https://yahoofinance.readthedocs.io/)

---

## 🔐 Environment Variables Required

```bash
# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Database
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/realtime_stock

# Cache
REDIS_URL=redis://xxxxx:xxxxx@xxx.upstash.io:xxxxx

# Claude API (deferred)
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Apps
NEXT_PUBLIC_PRODUCTION_URL=https://realtime-stock-yued.vercel.app
NODE_ENV=production
```

---

## ✅ Pre-Phase 1 Checklist

Before starting development:

- [ ] All team members have GitHub access
- [ ] Vercel project configured (staging + prod)
- [ ] PostgreSQL database created on Neon
- [ ] Redis instance created on Upstash
- [ ] Google OAuth credentials created
- [ ] GitHub Actions workflow file created
- [ ] Sentry project created for error tracking
- [ ] Slack #realtime-stock-phase1 channel created
- [ ] Daily standup meeting scheduled
- [ ] This Phase 1 plan reviewed and approved by team

---

## 🎯 Definition of Done

Phase 1 is **COMPLETE** when:

1. ✅ 50+ real news sources actively feeding
2. ✅ Claude API analyzing each article for beneficiaries
3. ✅ Google OAuth users can save preferences
4. ✅ KOSPI/KOSDAQ live data in header
5. ✅ All beneficiary scores calculated with 5-layer algorithm
6. ✅ >85% accuracy validated on 100 test articles
7. ✅ Zero TypeScript errors
8. ✅ Staging deployment verified
9. ✅ Production Vercel deployment live
10. ✅ Team signs off on readiness

---

## 📞 Escalation Process

**Issue Type → Response Time → Owner**

- 🔴 Production down: 15 min → DevOps Lead
- 🔴 Claude API failures: 30 min → Backend Lead
- 🟡 Feature blocked: 2 hours → Tech Lead
- 🟢 Question/guidance: 24 hours → Documentation

---

## 🎬 Next Steps (Start Monday)

1. **10 AM:** Kickoff meeting - review this guide
2. **11 AM:** Environment setup - get everyone running locally
3. **12 PM:** Code review standards - establish PR process
4. **1 PM:** Architecture diagram review - Q&A
5. **2 PM:** Task assignment - divide into 3 tracks

**Go time:** 3 PM - First commit to Phase 1 branch

