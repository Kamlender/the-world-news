'use client';

import { useState, useEffect } from 'react';

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadAuthors() {
    const res = await fetch('/api/v1/authors');
    const data = await res.json();
    setAuthors(data.authors || []);
    setLoading(false);
  }

  useEffect(() => { loadAuthors(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSaving(true);
    await fetch('/api/v1/authors', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), bio: bio.trim() }),
    });
    setName(''); setEmail(''); setBio(''); setSaving(false);
    loadAuthors();
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Authors</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700, fontSize: '0.95rem' }}>All Authors</div>
          {loading ? <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>Loading...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {authors.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 500 }}>{a.name}</td>
                    <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{a.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid var(--color-border-light)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Add New Author</h3>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Name *</label>
              <input id="auth-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="auth-email">Email *</label>
              <input id="auth-email" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="auth-bio">Bio</label>
              <textarea id="auth-bio" className="form-textarea" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Adding...' : 'Add Author'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
