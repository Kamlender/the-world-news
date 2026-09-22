import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'Careers — Join The World News Editorial Team',
  description: 'Explore career opportunities at The World News. We are hiring journalists, editors, developers, and media professionals who are passionate about trustworthy journalism.',
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Careers</h1>
        <p className={styles.pageSubtitle}>
          Join our team of passionate journalists, editors, and technologists working to shape the future of digital news in India and beyond.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Work With Us</h2>
          <p className={styles.paragraph}>
            At The World News, we are building more than a news platform — we are building a movement for trustworthy, accessible journalism. Our team members enjoy creative freedom, competitive compensation, and the opportunity to make a real impact on how millions of people stay informed about the world around them.
          </p>
          <p className={styles.paragraph}>
            We value diversity of thought, background, and experience. Whether you are an experienced journalist, a fresh graduate with a passion for storytelling, or a technologist who wants to innovate in media, we want to hear from you.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <ul className={styles.list}>
            <li>Competitive salary and performance-based incentives</li>
            <li>Flexible remote and hybrid work arrangements</li>
            <li>Opportunities for professional development and training</li>
            <li>A collaborative, inclusive, and innovation-driven work culture</li>
            <li>Byline recognition and editorial mentorship for journalists</li>
            <li>Health and wellness benefits for full-time team members</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          <p className={styles.paragraph}>
            We are always looking for talented individuals to join our team. While specific openings may vary, we regularly hire for the following roles:
          </p>
          <ul className={styles.list}>
            <li><strong>Reporters:</strong> News reporters covering India, world affairs, politics, business, technology, and sports</li>
            <li><strong>Editors:</strong> Copy editors, assignment editors, and senior editorial staff</li>
            <li><strong>Digital Producers:</strong> Social media managers, SEO specialists, and multimedia producers</li>
            <li><strong>Developers:</strong> Full-stack developers, frontend engineers, and DevOps specialists</li>
            <li><strong>Design:</strong> UI/UX designers and visual storytelling specialists</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Apply</h2>
          <p className={styles.paragraph}>
            To apply for any position, please send your resume, portfolio or writing samples, and a brief cover letter to our team via the <a href="/contact" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Contact page</a>. We review every application and will reach out to shortlisted candidates within two weeks.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
