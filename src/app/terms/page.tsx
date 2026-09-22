import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service — Usage Terms & Conditions',
  description: 'Read The World News terms of service covering website usage, intellectual property rights, user conduct, liability limitations, and governing law.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Terms of Service</h1>
        <p className={styles.pageSubtitle}>
          By accessing and using The World News website, you agree to be bound by these terms of service. Please read them carefully.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Acceptance of Terms</h2>
          <p className={styles.paragraph}>
            By accessing, browsing, or using The World News (theworldnews.app), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must discontinue use of our website immediately.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Intellectual Property</h2>
          <p className={styles.paragraph}>
            All content published on The World News, including but not limited to articles, photographs, graphics, logos, design elements, and software, is the property of The World News or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, modify, or republish any content from this website without prior written permission from The World News.
          </p>
          <p className={styles.paragraph}>
            You may share links to our articles on social media platforms and other websites, provided that proper attribution to The World News is given and the original source link is included.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>User Conduct</h2>
          <p className={styles.paragraph}>
            When using The World News website, you agree to:
          </p>
          <ul className={styles.list}>
            <li>Use the website only for lawful purposes and in accordance with these terms</li>
            <li>Not attempt to interfere with the proper functioning of the website</li>
            <li>Not use automated tools to scrape, crawl, or extract content without permission</li>
            <li>Not impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
            <li>Not upload or transmit any harmful, offensive, or illegal content</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
          <p className={styles.paragraph}>
            The World News provides its website and content on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied. We do not guarantee that the website will be uninterrupted, error-free, or free of viruses or other harmful components. In no event shall The World News be liable for any damages arising from the use or inability to use our website or services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Third-Party Links</h2>
          <p className={styles.paragraph}>
            Our website may contain links to third-party websites and services that are not owned or controlled by The World News. We are not responsible for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that The World News shall not be liable for any damage or loss caused by the use of any third-party content, goods, or services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Governing Law</h2>
          <p className={styles.paragraph}>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to These Terms</h2>
          <p className={styles.paragraph}>
            The World News reserves the right to modify or replace these terms at any time. Material changes will be communicated through a notice on our website. Your continued use of the website after any changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
