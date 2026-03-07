import { promises as fs } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const dataPath = join(process.cwd(), '..', 'backend', 'data', 'stocks.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return new Response(data, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Return mock data
    const mockData = [
      { ticker: "AAPL", price: 185.42, change: 2.15, momentum_20d: 5.32 },
      { ticker: "MSFT", price: 378.91, change: 1.85, momentum_20d: 4.20 },
      { ticker: "GOOGL", price: 140.23, change: -1.25, momentum_20d: -2.15 },
      { ticker: "NVDA", price: 892.45, change: 3.42, momentum_20d: 12.50 },
      { ticker: "TSLA", price: 242.56, change: -2.30, momentum_20d: -8.90 },
      { ticker: "META", price: 512.34, change: 2.10, momentum_20d: 6.75 },
      { ticker: "AMZN", price: 181.67, change: 1.45, momentum_20d: 3.20 },
      { ticker: "XOM", price: 105.23, change: -0.85, momentum_20d: 1.20 },
      { ticker: "CVX", price: 168.45, change: -1.20, momentum_20d: -2.30 },
      { ticker: "LMT", price: 478.92, change: 2.85, momentum_20d: 8.40 },
    ];

    return new Response(JSON.stringify(mockData), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
