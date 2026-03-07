"""Real-time stock price fetching using yfinance."""
import yfinance as yf
import pandas as pd
import logging
from typing import Dict, List
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sample stocks for demo (can be extended)
SAMPLE_TICKERS = [
    "SKI",  # SK Innovation
    "KAI",  # Korea Aerospace
    "HDCDB.KS",  # Hyundai
    "LG.KS",  # LG
    "SSNLF",  # Samsung
    "HANA",  # Hana Bank
    "005930.KS",  # Samsung Electronics (KS ticker)
    "000810.KS",  # Lotte Rental
]

def get_stock_price(ticker: str) -> Dict:
    """Fetch current price and basic info for a stock."""
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="5d")

        if data.empty:
            return None

        current_price = data["Close"].iloc[-1]
        previous_price = data["Close"].iloc[-2] if len(data) > 1 else current_price
        change_pct = ((current_price - previous_price) / previous_price * 100) if previous_price != 0 else 0

        # Calculate 20-day momentum
        data_20d = stock.history(period="20d")
        momentum = ((current_price - data_20d["Close"].iloc[0]) / data_20d["Close"].iloc[0] * 100) if len(
            data_20d) > 1 else 0

        result = {
            "ticker": ticker,
            "price": round(current_price, 2),
            "change": round(change_pct, 2),
            "change_sign": "+" if change_pct >= 0 else "",
            "momentum_20d": round(momentum, 2),
        }

        logger.info(f"Price: {ticker} = {current_price:.2f} ({change_pct:+.2f}%)")
        return result

    except Exception as e:
        logger.error(f"Error fetching {ticker}: {e}")
        return None

def get_portfolio_prices(tickers: List[str]) -> pd.DataFrame:
    """Fetch prices for multiple stocks."""
    results = []

    for ticker in tickers:
        price_data = get_stock_price(ticker)
        if price_data:
            results.append(price_data)

    df = pd.DataFrame(results)
    return df.sort_values("change", ascending=False) if not df.empty else df

def get_winners_and_losers(tickers: List[str], top_n: int = 10) -> tuple:
    """Get top winners and losers."""
    df = get_portfolio_prices(tickers)

    if df.empty:
        return pd.DataFrame(), pd.DataFrame()

    winners = df.head(top_n)
    losers = df.tail(top_n).sort_values("change", ascending=True)

    return winners, losers

if __name__ == "__main__":
    print("Fetching sample stock prices...")
    winners, losers = get_winners_and_losers(SAMPLE_TICKERS[:5])

    print("\n📈 Winners:")
    print(winners[["ticker", "price", "change"]])

    print("\n📉 Losers:")
    print(losers[["ticker", "price", "change"]])
