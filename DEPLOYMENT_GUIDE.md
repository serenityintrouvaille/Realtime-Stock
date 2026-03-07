# 🚀 GeopoliticStock Deployment Guide

## Quick Start (5 minutes)

### 1️⃣ Prerequisites
- [GitHub Account](https://github.com) (free)
- [Vercel Account](https://vercel.com) (free)
- [Google Gemini API Key](https://aistudio.google.com) (free, 15M tokens/month)

### 2️⃣ GitHub Setup
```bash
# Create repository
git clone https://github.com/yourusername/realtime-stock.git
cd realtime-stock
git add .
git commit -m "Initial commit"
git push origin main
```

### 3️⃣ Set GitHub Secrets
Go to **Settings → Secrets and variables → Actions**

Add secret:
```
GOOGLE_API_KEY = your_gemini_api_key_here
```

### 4️⃣ Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Root Directory:** `/` (default)
4. **Build Command:** `cd frontend && npm run build`
5. **Output Directory:** `frontend/.next`
6. Click **Deploy**

### 5️⃣ Verify Deployment
- ✅ Frontend: `https://yourproject.vercel.app`
- ✅ API: `https://yourproject.vercel.app/api/news`
- ✅ GitHub Actions: Auto-runs every hour

---

## 📋 Architecture

```
GitHub Actions (Hourly Cron)
├─ Triggers: 0 * * * * (every hour)
├─ Runs: update_data.py
├─ Output: backend/data/*.json
└─ Commits: git commit + push

Vercel Frontend
├─ Builds: Next.js React app
├─ API Routes: /api/news, /api/stocks
├─ Reads: backend/data/*.json
└─ Serves: Dashboard UI
```

---

## 📊 Data Flow

```
Hour 0:00 → GitHub Actions starts
  ├─ Fetches 50 news sources (RSS)
  ├─ Classifies with Gemini AI
  ├─ Calculates impact scores
  ├─ Fetches 100 stock prices (yfinance)
  ├─ Saves: backend/data/
  └─ Commits to GitHub

Vercel detects commit
  ├─ Rebuilds frontend
  ├─ Re-reads fresh data
  ├─ Deploys new version
  └─ Users see live updates
```

---

## 🔧 Environment Variables

### GitHub Actions (Backend)
- `GOOGLE_API_KEY` - Gemini API key (secret)

### Vercel (Frontend)
- No secrets needed (reads from GitHub repo)

---

## 📈 Monitoring

### GitHub Actions Logs
1. Go to **Actions** tab in GitHub
2. Click **Update Data Every Hour**
3. View latest run logs

### Vercel Logs
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. View **Deployments** and **Logs**

---

## 🚨 Troubleshooting

### Issue: GitHub Actions fails
**Check:**
- `GOOGLE_API_KEY` is set in GitHub Secrets
- Python version 3.11 is available
- Dependencies are installed: `pip install feedparser yfinance google-generativeai`

**Solution:**
```bash
# Run locally to test
cd backend/scripts
export GOOGLE_API_KEY=your_key_here
python update_data.py
```

### Issue: Vercel shows 404 on API
**Check:**
- API files exist: `frontend/app/api/news/route.ts`
- Build command correct: `cd frontend && npm run build`
- Output directory correct: `frontend/.next`

**Solution:**
```bash
# Test locally
cd frontend
npm install
npm run build
npm run start
# Visit: http://localhost:3000/api/news
```

### Issue: Data not updating
**Check:**
- GitHub Actions workflow file: `.github/workflows/update-data.yml`
- Check GitHub Actions tab for failures
- Verify `git push` succeeds in workflow

**Solution:**
```bash
# Manually trigger
# Go to Actions → Update Data Every Hour → Run workflow
```

---

## 📱 Local Development

### Setup
```bash
# Backend (Python 3.11+)
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
npm run dev
# Visit: http://localhost:3000
```

### Run Update Script Locally
```bash
cd backend/scripts
export GOOGLE_API_KEY=your_key_here
python update_data.py
```

### Build for Production
```bash
cd frontend
npm run build
npm run start
```

---

## 💰 Cost Breakdown

| Component | Cost | Notes |
|-----------|------|-------|
| Vercel Hosting | $0 | Free tier (≤100 deployments/day) |
| GitHub Actions | $0 | 2,000 min/month free |
| Google Gemini | $0 | 15M tokens/month free |
| yfinance | $0 | No API key needed |
| GitHub Storage | $0 | Public repo unlimited |
| **Total/Month** | **$0** | ✅ Completely Free |

---

## 🎯 Next Steps

### Phase 1: Launch
- [x] Deploy to Vercel
- [x] Set up GitHub Actions
- [x] Configure Gemini API
- [x] Monitor first 24 hours

### Phase 2: Scale (Optional)
- [ ] Add Slack notifications
- [ ] Add Discord webhooks
- [ ] Add email alerts
- [ ] Add database (PostgreSQL)
- [ ] Add more news sources
- [ ] Add portfolio tracking

### Phase 3: Monetize (Optional)
- [ ] Add premium features
- [ ] Add API access
- [ ] Add analytics

---

## 📞 Support

- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Contact:** GitHub Profile

---

## 🔄 Update Cycle

```
Every Hour:
0min:  Scrape 50 news sources
5min:  Classify with Gemini
7min:  Calculate impact scores
10min: Fetch 100 stock prices
12min: Generate analysis
15min: Commit & deploy
```

**Last Updated:** 2026-03-08
**Status:** Production Ready ✅
