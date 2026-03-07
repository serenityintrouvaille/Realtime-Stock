import { promises as fs } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const dataPath = join(process.cwd(), '..', 'backend', 'data', 'news.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return new Response(data, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Return mock data if file doesn't exist
    const mockData = [
      {
        id: "demo_1",
        title: "Russia increases military spending amid border tensions",
        summary: "Russia announces significant increase in military budget...",
        source: "Reuters",
        country: "Russia",
        region: "Europe",
        category: "Military Conflict",
        impact_score: 85,
        category_confidence: 0.95,
        timestamp: new Date().toISOString(),
      },
      {
        id: "demo_2",
        title: "US imposes new tariffs on Chinese imports",
        summary: "The United States has imposed additional tariffs on Chinese goods...",
        source: "Bloomberg",
        country: "US",
        region: "Americas",
        category: "Sanctions & Trade",
        impact_score: 78,
        category_confidence: 0.92,
        timestamp: new Date().toISOString(),
      },
      {
        id: "demo_3",
        title: "Tech regulation frameworks advance in EU",
        summary: "European Union accelerates digital regulation efforts...",
        source: "FT",
        country: "EU",
        region: "Europe",
        category: "Tech Regulation",
        impact_score: 72,
        category_confidence: 0.88,
        timestamp: new Date().toISOString(),
      },
    ];

    return new Response(JSON.stringify(mockData), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
