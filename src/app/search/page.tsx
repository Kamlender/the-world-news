'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ArticleCard from '@/components/public/ArticleCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function doSearch(q: string) {
    if (q.trim().length < 2) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/v1/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(data.articles || []);
      setTotal(data.total || 0);
    } catch {
      setResults([]);
      setTotal(0);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    doSearch(query);
    window.history.replaceState(null, '', `/search?q=${encodeURIComponent(query)}`);
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
          <button type="submit" className="btn btn-primary" disabled={loading || query.trim().length < 2}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {searched && !loading && (
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>
            {total} result{total !== 1 ? 's' : ''} found for &quot;{query}&quot;
          </p>
        )}

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border-light)' }}>
                <div className="skeleton skeleton-image" />
                <div style={{ padding: '1rem' }}>
                  <div className="skeleton skeleton-text" style={{ width: '40%' }} />
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text" style={{ width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {results.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-tertiary)' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No articles found</p>
            <p style={{ fontSize: '0.875rem' }}>Try different keywords or browse our <Link href="/" style={{ color: 'var(--color-accent)' }}>homepage</Link>.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
