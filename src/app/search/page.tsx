'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
          Search
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', maxWidth: '600px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="form-input"
            style={{ flex: 1 }}
            id="search-input"
            autoFocus
          />
          <button type="submit" className="btn btn-primary" disabled={query.trim().length < 2}>
            Search
          </button>
        </form>

        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-tertiary)' }}>
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Search is available on the full version of this site.</p>
          <p style={{ fontSize: '0.875rem' }}>Browse our <Link href="/" style={{ color: 'var(--color-accent)' }}>homepage</Link> to discover articles.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
