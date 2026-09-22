import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
  title: 'About Us — Our Mission, Values & Editorial Team',
  description: 'Learn about The World News — our mission to deliver fast, trustworthy journalism, our editorial values, and the team behind the stories. Committed to accuracy and accountability.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>About Us</h1>
        <p className={styles.pageSubtitle}>
          The World News is a digital-first news platform committed to delivering fast, accurate, and trustworthy journalism to readers across India and the world.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.paragraph}>
            At The World News, we believe that access to reliable, well-sourced news is a fundamental right. Our mission is to empower citizens with the information they need to make informed decisions about their lives, communities, and the world around them. We strive to cut through noise and misinformation by upholding the highest standards of journalistic integrity in every story we publish.
          </p>
          <p className={styles.paragraph}>
            Founded with the vision of creating a new kind of news platform — one that puts trust, transparency, and reader value above clickbait and sensationalism — The World News covers breaking news, politics, business, technology, sports, and human-interest stories with equal rigor and care.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <ul className={styles.list}>
            <li><strong>Accuracy First:</strong> Every fact is verified before publication. We correct errors promptly and transparently.</li>
            <li><strong>Independence:</strong> Our editorial decisions are made independently, free from political or commercial influence.</li>
            <li><strong>Accountability:</strong> We take responsibility for our journalism and welcome reader feedback and scrutiny.</li>
            <li><strong>Inclusivity:</strong> We cover stories from diverse perspectives and communities, ensuring every voice is heard.</li>
            <li><strong>Transparency:</strong> We disclose our sources, methodology, and any potential conflicts of interest.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.paragraph}>
            The World News is powered by a dedicated team of journalists, editors, and technologists who share a common passion for truth-telling and public service. Our newsroom operates around the clock to bring you the stories that matter most, with the speed and depth that modern readers expect.
          </p>
          <p className={styles.paragraph}>
            Our editorial team includes experienced reporters covering politics, economics, science, technology, sports, and culture. Every article goes through a rigorous editorial review process before publication, ensuring accuracy, fairness, and balance.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.paragraph}>
            We value your feedback and story tips. If you have a news tip, correction, or general inquiry, please visit our <a href="/contact" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Contact page</a> or reach out to our editorial team directly.
          </p>
        </section>

        <p className={styles.lastUpdated}>Last updated: September 2026</p>
      </main>
      <Footer />
    </>
  );
}
