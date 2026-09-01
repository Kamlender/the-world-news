import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NewsHub — Fast, Trustworthy News',
    template: '%s | NewsHub',
  },
  description: 'Fast, trustworthy news — discover what matters. Breaking news, India, World, Politics, Business, Technology, Sports.',
  keywords: ['news', 'breaking news', 'India news', 'world news', 'politics', 'business', 'technology', 'sports'],
  authors: [{ name: 'NewsHub Editorial Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'NewsHub',
    title: 'NewsHub — Fast, Trustworthy News',
    description: 'Fast, trustworthy news — discover what matters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewsHub — Fast, Trustworthy News',
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
      <body>
        {children}
      </body>
    </html>
  );
}
