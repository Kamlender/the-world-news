import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch With The World News',
  description: 'Contact The World News editorial team for news tips, corrections, partnerships, advertising inquiries, or general feedback. We value your input.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Contact Us</h1>
        <p className={styles.pageSubtitle}>
          We welcome your feedback, story tips, and inquiries. The World News editorial team is always ready to hear from our readers and partners.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <p className={styles.paragraph}>
            Whether you have a breaking news tip, want to report an error in one of our stories, or simply have a question about our journalism, we are here to listen. Your input helps us improve our coverage and maintain the high editorial standards our readers expect.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Email Us</h2>
          <div className={styles.contactCard}>
            <p className={styles.contactLabel}>General Inquiries</p>
            <p className={styles.contactValue}>
              <a href="mailto:contact@theworldnews.app">contact@theworldnews.app</a>
            </p>
          </div>
          <div className={styles.contactCard}>
            <p className={styles.contactLabel}>News Tips & Story Leads</p>
            <p className={styles.contactValue}>
              <a href="mailto:tips@theworldnews.app">tips@theworldnews.app</a>
            </p>
          </div>
          <div className={styles.contactCard}>
            <p className={styles.contactLabel}>Corrections & Feedback</p>
            <p className={styles.contactValue}>
              <a href="mailto:corrections@theworldnews.app">corrections@theworldnews.app</a>
            </p>
          </div>
          <div className={styles.contactCard}>
            <p className={styles.contactLabel}>Advertising & Partnerships</p>
            <p className={styles.contactValue}>
              <a href="mailto:partnerships@theworldnews.app">partnerships@theworldnews.app</a>
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Response Time</h2>
          <p className={styles.paragraph}>
            We aim to respond to all inquiries within 24 to 48 hours during business days. For urgent news tips, please mark your email as urgent and our editorial desk will prioritize your message. If you are reporting a factual error in a published story, we will review and take corrective action as quickly as possible.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Office Address</h2>
          <p className={styles.paragraph}>
            The World News<br />
            New Delhi, India
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
