import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The World News — Fast, Trustworthy News',
    template: '%s | The World News',
  },
  description: 'Fast, trustworthy news — discover what matters. Breaking news, India, World, Politics, Business, Technology, Sports.',
  keywords: ['The World News', 'news', 'breaking news', 'India news', 'world news', 'politics', 'business', 'technology', 'sports'],
  authors: [{ name: 'The World News Editorial Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'The World News',
    title: 'The World News — Fast, Trustworthy News',
    description: 'Fast, trustworthy news — discover what matters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The World News — Fast, Trustworthy News',
    description: 'Fast, trustworthy news — discover what matters.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster DNS + TLS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Non-render-blocking font load with display=swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

