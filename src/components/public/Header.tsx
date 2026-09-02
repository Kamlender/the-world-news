'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

const CATEGORIES = [
  { name: 'India', slug: 'india' },
  { name: 'World', slug: 'world' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Business', slug: 'business' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Sports', slug: 'sports' },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'hinglish', label: 'Hinglish' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const currentLangLabel = LANGUAGES.find(l => l.code === currentLang)?.label || 'English';

  return (
    <header className={styles.header} id="site-header">
      {/* Top Bar: Logo + Actions */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo} id="logo-link">
          <span className={styles.logoText}>
            The <span className={styles.logoAccent}>World</span> News
          </span>
        </Link>

        <div className={styles.headerActions}>
          <span className={styles.dateStrip}>{today}</span>

          {/* NGO Button */}
          <Link href="/ngo" className={styles.ngoBtn} id="ngo-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className={styles.ngoBtnText}>NGO</span>
          </Link>

          {/* Language Selector */}
          <div className={styles.langWrapper}>
            <button
              className={styles.langBtn}
              onClick={() => setLangDropdown(!langDropdown)}
              aria-label="Select language"
              id="lang-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className={styles.langBtnText}>{currentLangLabel}</span>
              <svg className={styles.langChevron} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langDropdown && (
              <div className={styles.langDropdown}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.langOption} ${currentLang === lang.code ? styles.langOptionActive : ''}`}
                    onClick={() => { setCurrentLang(lang.code); setLangDropdown(false); }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            id="mobile-menu-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className={styles.navBar} id="desktop-nav" aria-label="Main navigation">
        <div className={styles.navInner}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={styles.navLink}
              id={`nav-${cat.slug}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        id="mobile-nav-overlay"
      >
        <div
          className={styles.mobileNavContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.mobileNavClose}>
            <button
              className={styles.closeBtn}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className={styles.mobileNavLinks} aria-label="Mobile navigation">
            <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/ngo" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
              NGO
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
