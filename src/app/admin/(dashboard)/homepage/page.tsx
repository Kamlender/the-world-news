'use client';

import { useState, useEffect } from 'react';

export default function AdminHomepagePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function loadArticles() {
    const res = await fetch('/api/v1/articles');
    const data = await res.json();
    setArticles(data.articles || []);
    setLoading(false);
  }

  useEffect(() => { loadArticles(); }, []);

  async function toggleField(id: string, field: 'isBreaking' | 'isFeatured', value: boolean) {
    setUpdating(id);
    await fetch(`/api/v1/articles/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    setUpdating(null);
    loadArticles();
  }

  const published = articles.filter((a) => a.status === 'PUBLISHED');
  const breakingArticles = published.filter((a) => a.isBreaking);
  const featuredArticles = published.filter((a) => a.isFeatured);

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Homepage Manager</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginBottom: '2rem' }}>
        Control which articles appear as Breaking News or Featured Story on the homepage.
      </p>

      {loading ? <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-tertiary)' }}>Loading...</div> : (
        <>
          {/* Current Breaking */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 8, height: 8, background: '#dc2626', borderRadius: '50%', display: 'inline-block' }} />
              Breaking News ({breakingArticles.length})
            </div>
            {breakingArticles.map((a) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ fontSize: '0.875rem' }}>{a.title}</span>
                <button onClick={() => toggleField(a.id, 'isBreaking', false)} disabled={updating === a.id}
                  style={{ fontSize: '0.75rem', padding: '4px 10px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                  Remove
                </button>
              </div>
            ))}
            {breakingArticles.length === 0 && <div style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>No breaking news set.</div>}
          </div>

          {/* Current Featured */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700 }}>
              Featured Story ({featuredArticles.length})
            </div>
            {featuredArticles.map((a) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ fontSize: '0.875rem' }}>{a.title}</span>
                <button onClick={() => toggleField(a.id, 'isFeatured', false)} disabled={updating === a.id}
                  style={{ fontSize: '0.75rem', padding: '4px 10px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                  Remove
                </button>
              </div>
            ))}
            {featuredArticles.length === 0 && <div style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>No featured story set.</div>}
          </div>

          {/* All published articles */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700 }}>
              All Published Articles ({published.length})
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg-secondary)' }}>
                  {['Title', 'Category', 'Breaking', 'Featured'].map((h) => (
                    <th key={h} style={{ padding: '0.6rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {published.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                    <td style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 500 }}>{a.title.substring(0, 50)}{a.title.length > 50 ? '...' : ''}</td>
                    <td style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{a.category?.name}</td>
                    <td style={{ padding: '0.6rem 1.25rem' }}>
                      <button onClick={() => toggleField(a.id, 'isBreaking', !a.isBreaking)} disabled={updating === a.id}
                        className="btn btn-sm" style={{ background: a.isBreaking ? '#dc2626' : 'var(--color-bg-tertiary)', color: a.isBreaking ? '#fff' : 'var(--color-text-secondary)', border: 'none' }}>
                        {a.isBreaking ? 'On' : 'Off'}
                      </button>
                    </td>
                    <td style={{ padding: '0.6rem 1.25rem' }}>
                      <button onClick={() => toggleField(a.id, 'isFeatured', !a.isFeatured)} disabled={updating === a.id}
                        className="btn btn-sm" style={{ background: a.isFeatured ? '#f59e0b' : 'var(--color-bg-tertiary)', color: a.isFeatured ? '#fff' : 'var(--color-text-secondary)', border: 'none' }}>
                        {a.isFeatured ? 'On' : 'Off'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
