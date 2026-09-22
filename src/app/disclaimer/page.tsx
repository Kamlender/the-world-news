import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'Disclaimer — Content Accuracy & Liability Notice',
  description: 'Read the disclaimer for The World News regarding content accuracy, liability limitations, external links, and third-party content. Understand our editorial responsibilities.',
};

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Disclaimer</h1>
        <p className={styles.pageSubtitle}>
          Please read this disclaimer carefully before using The World News website and services.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>General Information</h2>
          <p className={styles.paragraph}>
            The information provided on The World News (theworldnews.app) is for general informational and educational purposes only. While we strive to ensure the accuracy, completeness, and timeliness of all content published on our platform, we make no warranties or representations of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>No Professional Advice</h2>
          <p className={styles.paragraph}>
            The content on this website does not constitute professional advice of any kind, including but not limited to legal, financial, medical, or investment advice. Readers should consult with qualified professionals before making any decisions based on information presented on The World News. Any reliance you place on information from this website is strictly at your own risk.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>External Links</h2>
          <p className={styles.paragraph}>
            Our website may contain links to external websites that are not operated or controlled by The World News. We have no control over the content, privacy policies, or practices of third-party websites and accept no responsibility or liability for their content. The inclusion of any external link does not imply endorsement or approval of the linked website or its content.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
          <p className={styles.paragraph}>
            In no event shall The World News, its editorial team, contributors, or affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from or in connection with the use of this website, even if advised of the possibility of such damages. This includes, without limitation, damages for loss of profits, data, or other intangible losses resulting from the use or inability to use our services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Content Accuracy</h2>
          <p className={styles.paragraph}>
            While our editorial team works diligently to verify all facts and sources before publication, errors may occasionally occur. If you notice any inaccuracy in our reporting, please contact us at <a href="mailto:corrections@theworldnews.app" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>corrections@theworldnews.app</a> and we will review and correct the information promptly.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to This Disclaimer</h2>
          <p className={styles.paragraph}>
            The World News reserves the right to update or modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting on this page. We encourage users to review this disclaimer periodically to stay informed about our policies.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
