"""Production Streamlit Dashboard for GeopoliticStock."""
import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime
import os
from dotenv import load_dotenv

# Import local modules
from news_scraper import fetch_news
from category_classifier import classify_batch
from impact_score import calculate_impact_score
from trader_score import calculate_trader_score
from analysis import analyze_stocks
from stock_prices import get_winners_and_losers, SAMPLE_TICKERS

# Load environment variables
load_dotenv()

# Page configuration
st.set_page_config(
    page_title="GeopoliticStock",
    page_icon="📈",
    layout="wide",
)

# Title
st.title("🌍 GeopoliticStock")
st.subheader("Real-time Geopolitical News → Stock Analysis Dashboard")

# Initialize session state
if "news_data" not in st.session_state:
    st.session_state.news_data = None
if "stock_data" not in st.session_state:
    st.session_state.stock_data = None

# Create tabs
tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "📰 News", "📈 Winners", "📉 Losers", "🎯 Analysis", "💼 Portfolio"
])

# ==================== TAB 1: NEWS ====================
with tab1:
    st.header("📰 Latest Geopolitical News")

    if st.button("🔄 Refresh News", use_container_width=True):
        with st.spinner("Fetching latest news..."):
            news = fetch_news()
            if news:
                news = classify_batch(news)
                for article in news:
                    article["impact_score"] = calculate_impact_score(article)
                st.session_state.news_data = news
                st.success(f"✅ Fetched {len(news)} articles")

    if st.session_state.news_data:
        for idx, article in enumerate(st.session_state.news_data):
            with st.expander(f"[{article.get('category', 'Unknown')}] {article['title'][:60]}..."):
                col1, col2, col3 = st.columns(3)
                with col1:
                    st.metric("Impact Score", f"{article.get('impact_score', 50):.0f}/100")
                with col2:
                    st.metric("Confidence", f"{article.get('category_confidence', 0.5):.0%}")
                with col3:
                    st.write(f"**Source:** {article.get('source', 'Unknown')}")
                st.write(article.get('summary', 'N/A'))
    else:
        st.info("Click 'Refresh News' to fetch latest articles")

# ==================== TAB 2: WINNERS ====================
with tab2:
    st.header("📈 Top Gaining Stocks")

    if st.button("🔄 Refresh Winners", use_container_width=True, key="winners"):
        with st.spinner("Fetching stock prices..."):
            winners, _ = get_winners_and_losers(SAMPLE_TICKERS)
            st.session_state.stock_data = winners

    if isinstance(st.session_state.stock_data, pd.DataFrame) and not st.session_state.stock_data.empty:
        df = st.session_state.stock_data
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Top Winner", df.iloc[0]["ticker"], f"+{df.iloc[0]['change']:.2f}%")
        with col2:
            st.metric("Avg Gain", f"+{df['change'].mean():.2f}%")
        with col3:
            st.metric("Count", len(df))

        st.dataframe(df[["ticker", "price", "change"]], use_container_width=True)
    else:
        st.info("Click 'Refresh Winners' to fetch stock data")

# ==================== TAB 3: LOSERS ====================
with tab3:
    st.header("📉 Top Losing Stocks")

    if st.button("🔄 Refresh Losers", use_container_width=True, key="losers"):
        with st.spinner("Fetching stock prices..."):
            _, losers = get_winners_and_losers(SAMPLE_TICKERS)
            st.session_state.stock_data = losers

    if isinstance(st.session_state.stock_data, pd.DataFrame) and not st.session_state.stock_data.empty:
        df = st.session_state.stock_data
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Top Loser", df.iloc[0]["ticker"], f"{df.iloc[0]['change']:.2f}%")
        with col2:
            st.metric("Avg Loss", f"{df['change'].mean():.2f}%")
        with col3:
            st.metric("Count", len(df))

        st.dataframe(df[["ticker", "price", "change"]], use_container_width=True)
    else:
        st.info("Click 'Refresh Losers' to fetch stock data")

# ==================== TAB 4: ANALYSIS ====================
with tab4:
    st.header("🎯 Stock Impact Analysis")

    if st.session_state.news_data:
        selected_idx = st.selectbox(
            "Select article:",
            range(len(st.session_state.news_data)),
            format_func=lambda i: st.session_state.news_data[i]["title"][:50]
        )

        article = st.session_state.news_data[selected_idx]
        analysis = analyze_stocks(article)

        st.subheader(article['title'])

        col1, col2 = st.columns(2)
        with col1:
            st.write("**🟢 Direct Beneficiaries**")
            for stock in analysis["direct_beneficiaries"]:
                st.write(f"• {stock['company']} → {stock['change']}")
            st.write("**🟡 Indirect Beneficiaries**")
            for stock in analysis["indirect_beneficiaries"]:
                st.write(f"• {stock['company']} → {stock['change']}")

        with col2:
            st.write("**🔴 Direct Victims**")
            for stock in analysis["direct_victims"]:
                st.write(f"• {stock['company']} → {stock['change']}")
            st.write("**🟠 Indirect Victims**")
            for stock in analysis["indirect_victims"]:
                st.write(f"• {stock['company']} → {stock['change']}")
    else:
        st.info("Fetch news first to see impact analysis")

# ==================== TAB 5: PORTFOLIO ====================
with tab5:
    st.header("💼 All Monitored Stocks")

    if st.button("🔄 Refresh Portfolio", use_container_width=True, key="portfolio"):
        with st.spinner("Fetching all stock prices..."):
            winners, losers = get_winners_and_losers(SAMPLE_TICKERS)
            st.session_state.portfolio_data = pd.concat([winners, losers])

    if "portfolio_data" in st.session_state:
        df = st.session_state.portfolio_data
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Stocks", len(df))
        with col2:
            st.metric("Avg Change", f"{df['change'].mean():+.2f}%")
        with col3:
            st.metric("Winners", len(df[df['change'] > 0]))

        st.dataframe(df[["ticker", "price", "change"]].sort_values("change", ascending=False), use_container_width=True)
    else:
        st.info("Click 'Refresh Portfolio' to fetch all stock data")

st.divider()
st.caption("GeopoliticStock - Powered by Google Gemini API & yfinance")
