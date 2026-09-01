'use client';

import { useState, useEffect } from 'react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadCategories() {
    const res = await fetch('/api/v1/categories');
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  }

  useEffect(() => { loadCategories(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await fetch('/api/v1/categories', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), description: description.trim() }),
    });
    setName(''); setDescription(''); setSaving(false);
    loadCategories();
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Categories</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* List */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700, fontSize: '0.95rem' }}>All Categories</div>
          {loading ? <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>Loading...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 500 }}>{c.name}</td>
                    <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>/{c.slug}</td>
                    <td style={{ padding: '0.75rem 1.25rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: c.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2', color: c.status === 'ACTIVE' ? '#166534' : '#991b1b' }}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add form */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid var(--color-border-light)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Add New Category</h3>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="form-label" htmlFor="cat-name">Name *</label>
              <input id="cat-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Entertainment" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cat-desc">Description</label>
              <textarea id="cat-desc" className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Optional" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Adding...' : 'Add Category'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
