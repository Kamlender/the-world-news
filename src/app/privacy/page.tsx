import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — How We Protect Your Data & Privacy',
  description: 'Read The World News privacy policy to understand how we collect, use, store, and protect your personal data. Learn about cookies, analytics, and your privacy rights.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Privacy Policy</h1>
        <p className={styles.pageSubtitle}>
          Your privacy is important to us. This policy explains how The World News collects, uses, and protects your personal information.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <p className={styles.paragraph}>
            When you visit The World News, we may collect certain information automatically, including your IP address, browser type, device information, referring URL, pages visited, and the date and time of your visit. This information is collected through cookies and similar tracking technologies and is used to improve our website performance and user experience.
          </p>
          <p className={styles.paragraph}>
            If you subscribe to our newsletter, contact us, or create an account, we may also collect personal information such as your name and email address. We only collect information that is necessary for the purposes described in this policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
          <p className={styles.paragraph}>
            We use the information we collect for the following purposes:
          </p>
          <ul className={styles.list}>
            <li>To provide, maintain, and improve our website and services</li>
            <li>To personalize your experience and deliver relevant content</li>
            <li>To send you newsletters and updates (only with your consent)</li>
            <li>To analyze website traffic and usage patterns</li>
            <li>To detect and prevent fraud, abuse, or security threats</li>
            <li>To comply with legal obligations and respond to lawful requests</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cookies & Tracking</h2>
          <p className={styles.paragraph}>
            The World News uses cookies and similar technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you interact with our website. You can control cookie settings through your browser preferences. Please note that disabling cookies may affect some features of our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Sharing & Third Parties</h2>
          <p className={styles.paragraph}>
            We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data with analytics providers to help us understand website usage patterns. We may also share information when required by law, to protect our rights, or to comply with legal processes.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Security</h2>
          <p className={styles.paragraph}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Rights</h2>
          <p className={styles.paragraph}>
            You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving marketing communications from us. To exercise any of these rights, please contact us at <a href="mailto:contact@theworldnews.app" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>contact@theworldnews.app</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
          <p className={styles.paragraph}>
            We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify users of significant changes by posting a notice on our website. We encourage you to review this policy periodically.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
