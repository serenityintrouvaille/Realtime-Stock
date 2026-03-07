# 🚀 GeopoliticStock - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: GitHub Secrets (1 min)
1. Go to [GitHub Settings](https://github.com/yourusername/Realtime-Stock/settings/secrets/actions)
2. Click **New repository secret**
3. Add: `GOOGLE_API_KEY` = [Get from here](https://aistudio.google.com)

### Step 2: Deploy to Vercel (2 min)
1. Go to [Vercel](https://vercel.com/new)
2. Click **Import Project** → Select your GitHub repository
3. **Root Directory:** `/` (default)
4. **Build Command:** `cd frontend && npm run build`
5. **Output Directory:** `frontend/.next`
6. Click **Deploy**

### Step 3: Wait for GitHub Actions (2 min)
- Go to **Actions** tab in GitHub
- Watch **Update Data Every Hour** workflow run
- First data fetch will populate backend/data/ with real news & stocks

### Step 4: Access Dashboard
- Frontend: `https://yourproject.vercel.app`
- API News: `https://yourproject.vercel.app/api/news`
- API Stocks: `https://yourproject.vercel.app/api/stocks`

---

## 🎯 What You Get

✅ **Real-time Dashboard**
- 8 interactive tabs
- 50+ news sources
- 100 global stocks
- AI-powered analysis

✅ **Automatic Updates**
- Every hour, GitHub Actions scrapes news
- Classifies with Google Gemini AI
- Calculates impact scores
- Updates stock prices
- Commits to GitHub
- Vercel auto-redeploys

✅ **Zero Cost**
- Vercel hosting: Free
- GitHub Actions: Free (2,000 min/month)
- Google Gemini: Free (15M tokens/month)
- yfinance: Free (no API key)

---

## 📊 Data Flow

```
GitHub Actions (Hourly)
├─ Scrapes 50 news sources
├─ Classifies news (Gemini AI)
├─ Scores impact (5 criteria)
├─ Fetches 100 stock prices
└─ Commits to GitHub

↓

Vercel detects commit
├─ Rebuilds frontend
├─ Loads fresh data
├─ Deploys new version
└─ Dashboard updates live

↓

Users see live data
├─ 📰 Latest news
├─ 📈/📉 Stock movements
├─ 🎯 Impact analysis
└─ 💼 Portfolio view
```

---

## 🔧 Troubleshooting

### "404 on /api/news"
- Check: API files exist → `frontend/app/api/news/route.ts`
- Run: `cd frontend && npm run build`
- Redeploy to Vercel

### "GitHub Actions failing"
- Check: `GOOGLE_API_KEY` is set in GitHub Secrets
- View logs: **Actions** → **Update Data Every Hour** → Latest run
- Test locally: `cd backend/scripts && python update_data.py`

### "No data in dashboard"
- Wait for first GitHub Actions run (every hour on the hour)
- Check: `backend/data/news.json` exists (manually trigger if needed)
- Use mock data for testing (automatic fallback)

---

## 📚 Next Steps

### Phase 2: Enhanced Features
- [ ] Real-time alerts (Slack/Discord)
- [ ] Email notifications
- [ ] Advanced charts (Plotly)
- [ ] Database persistence (PostgreSQL)
- [ ] User accounts & portfolios
- [ ] More news sources (1000+)

### Phase 3: Monetization
- [ ] Premium tier features
- [ ] API access for clients
- [ ] White-label dashboard
- [ ] Enterprise support

---

## 🔐 Security

- ✅ No user data collected
- ✅ API keys in GitHub Secrets (not in code)
- ✅ HTTPS only (Vercel)
- ✅ Public read-only dashboard
- ✅ No database (Git-based, immutable)

---

## 📞 Support

- **Issues:** GitHub Issues tab
- **Discussions:** GitHub Discussions
- **Docs:** DEPLOYMENT_GUIDE.md

---

## 🎉 You're Ready!

Your GeopoliticStock dashboard is now:
- ✅ Live and accessible
- ✅ Auto-updating every hour
- ✅ Powered by AI
- ✅ Completely free
- ✅ Production-ready

**Time to launch:** ~5 minutes
**Monthly cost:** $0
**Tech stack:** Next.js + Python + Gemini + Vercel

---

**Built with ❤️ using Claude Code**
