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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className={styles.header} id="site-header">
      {/* Top Bar: Logo + Search + Menu */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo} id="logo-link">
          <span className={styles.logoText}>
            The <span className={styles.logoAccent}>World</span> News
          </span>
        </Link>

        <div className={styles.headerActions}>
          <span className={styles.dateStrip}>{today}</span>

          <Link href="/search" className={styles.searchBtn} id="search-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

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
            <Link href="/search" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
              Search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
