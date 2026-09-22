import Link from 'next/link';
import styles from './Footer.module.css';

const CATEGORIES = [
  { name: 'India', slug: 'india' },
  { name: 'World', slug: 'world' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Business', slug: 'business' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Sports', slug: 'sports' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.brand}>
            <img
              src="/logo.png"
              alt="The World News"
              className={styles.brandLogoImg}
            />
            <p className={styles.brandDesc}>
              Fast, trustworthy news discover what matters. We bring you accurate, 
              well-sourced journalism with editorial accountability at the core.
            </p>
          </div>

          {/* Categories */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Categories</h4>
            <nav className={styles.columnLinks}>
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/${cat.slug}`} className={styles.columnLink}>
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Company</h4>
            <nav className={styles.columnLinks}>
              <Link href="/about" className={styles.columnLink}>About Us</Link>
              <Link href="/editorial-policy" className={styles.columnLink}>Editorial Policy</Link>
              <Link href="/contact" className={styles.columnLink}>Contact</Link>
              <Link href="/careers" className={styles.columnLink}>Careers</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Legal</h4>
            <nav className={styles.columnLinks}>
              <Link href="/privacy" className={styles.columnLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.columnLink}>Terms of Service</Link>
              <Link href="/disclaimer" className={styles.columnLink}>Disclaimer</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} The World News. All rights reserved.
          </p>
          <p className={styles.credit}>
            Designed &amp; built by{' '}
            <a href="https://tinytoono.in" target="_blank" rel="noopener noreferrer" className={styles.creditStudioLink}>
              <span className={styles.creditStudio}>ZYROO STUDIO</span>
            </a>
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/sitemap.xml" className={styles.bottomLink}>Sitemap</Link>
            <Link href="/rss" className={styles.bottomLink}>RSS Feed</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
