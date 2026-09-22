import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'Editorial Policy — Our Journalism Standards & Ethics',
  description: 'Read The World News editorial policy covering our journalism standards, fact-checking process, corrections policy, source attribution, and ethical guidelines.',
};

export default function EditorialPolicyPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Editorial Policy</h1>
        <p className={styles.pageSubtitle}>
          Our editorial policy outlines the principles, standards, and ethical guidelines that govern all journalism published by The World News.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Editorial Independence</h2>
          <p className={styles.paragraph}>
            The World News maintains complete editorial independence. Our news coverage, story selection, and editorial decisions are made solely by our editorial team, free from any external political, corporate, or commercial pressure. Advertisers and sponsors have no influence over our editorial content or news judgment.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Accuracy & Fact-Checking</h2>
          <p className={styles.paragraph}>
            Accuracy is the foundation of our journalism. Every article published on The World News goes through a rigorous fact-checking process before publication. Our editors verify all facts, statistics, quotes, and claims with primary sources whenever possible. We use multiple independent sources to confirm information and clearly attribute all facts to their sources.
          </p>
          <p className={styles.paragraph}>
            When reporting breaking news, we prioritize verified information over speed. We would rather be second with accurate news than first with unverified claims. We clearly label developing stories and update them as new information becomes available.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Source Attribution</h2>
          <p className={styles.paragraph}>
            We believe in transparency about our sources. All articles on The World News include clear source attribution, whether from government releases, official statements, court documents, press conferences, news agencies, or our own original reporting. We classify source types to help readers evaluate the reliability and origin of the information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Corrections Policy</h2>
          <p className={styles.paragraph}>
            When we make errors, we correct them promptly and transparently. Corrections are clearly marked within the article, including the date of the correction and what was changed. We do not silently alter published stories. Significant corrections are noted with a prominent correction notice at the top of the affected article.
          </p>
          <p className={styles.paragraph}>
            To report an error, please contact us at <a href="mailto:corrections@theworldnews.app" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>corrections@theworldnews.app</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fairness & Balance</h2>
          <p className={styles.paragraph}>
            We are committed to fair and balanced reporting. We seek to present multiple perspectives on complex and contentious issues, giving all relevant parties the opportunity to respond. We distinguish clearly between news reporting and opinion or analysis pieces.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Conflicts of Interest</h2>
          <p className={styles.paragraph}>
            Our journalists and editors are required to disclose any potential conflicts of interest. Staff members do not cover stories involving organizations, individuals, or entities in which they have a personal financial or familial interest. Any unavoidable conflicts are disclosed to readers transparently.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
