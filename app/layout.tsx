import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '한국 주식 분석기 - 실시간 뉴스 → 주식 영향 분석',
  description: '실시간 뉴스를 분석하여 한국 주식 시장의 영향을 즉각 파악하는 대시보드',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
