import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GeopoliticStock - Real-time Geopolitical News → Stock Analysis',
  description: 'Real-time dashboard analyzing geopolitical news impact on global stocks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
