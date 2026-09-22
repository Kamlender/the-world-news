import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'RSS Feed — Subscribe to The World News Updates',
  description: 'Subscribe to The World News RSS feed to get the latest news articles, breaking stories, and updates delivered directly to your feed reader.',
};

export default function RSSPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>RSS Feed</h1>
        <p className={styles.pageSubtitle}>
          Stay updated with the latest news from The World News by subscribing to our RSS feeds. Get articles delivered directly to your preferred feed reader.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is RSS?</h2>
          <p className={styles.paragraph}>
            RSS (Really Simple Syndication) is a web feed format that allows you to subscribe to updates from websites you follow. Instead of visiting each website individually, RSS delivers new content directly to your feed reader application. This is an efficient way to stay informed about the latest news without having to constantly check our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Subscribe</h2>
          <p className={styles.paragraph}>
            To subscribe to The World News RSS feed, you will need an RSS feed reader. Popular options include Feedly, Inoreader, NewsBlur, and The Old Reader. Many web browsers also support RSS feeds natively or through extensions.
          </p>
          <p className={styles.paragraph}>
            Simply copy our feed URL and paste it into your preferred RSS reader to start receiving our latest articles automatically.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Available Feeds</h2>
          <div className={styles.contactCard}>
            <p className={styles.contactLabel}>Main Feed — All Categories</p>
            <p className={styles.contactValue}>
              theworldnews.app/rss
            </p>
          </div>
          <p className={styles.paragraph}>
            Our main RSS feed includes the latest articles from all categories — India, World, Politics, Business, Technology, and Sports. Category-specific feeds will be available soon.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Feed Usage Guidelines</h2>
          <p className={styles.paragraph}>
            Our RSS feeds are provided free of charge for personal, non-commercial use. If you wish to use our feed content for commercial purposes, syndication, or redistribution, please contact us at <a href="mailto:contact@theworldnews.app" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>contact@theworldnews.app</a> for permission. All content delivered via RSS remains the intellectual property of The World News and is subject to our Terms of Service.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
