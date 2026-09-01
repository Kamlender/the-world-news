'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ArticleFormProps {
  articleId?: string;
}

export default function ArticleForm({ articleId }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!articleId;

  const [form, setForm] = useState({
    title: '', content: '', excerpt: '', categoryId: '', authorId: '',
    featuredImage: '', imageAlt: '', isBreaking: false, isFeatured: false, status: 'DRAFT',
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [catRes, authRes] = await Promise.all([
        fetch('/api/v1/categories'), fetch('/api/v1/authors'),
      ]);
      const catData = await catRes.json();
      const authData = await authRes.json();
      setCategories(catData.categories || []);
      setAuthors(authData.authors || []);

      if (isEdit) {
        const artRes = await fetch(`/api/v1/articles/${articleId}`);
        const artData = await artRes.json();
        if (artData.article) {
          const a = artData.article;
          setForm({
            title: a.title || '', content: a.content || '', excerpt: a.excerpt || '',
            categoryId: a.categoryId || '', authorId: a.authorId || '',
            featuredImage: a.featuredImage || '', imageAlt: a.imageAlt || '',
            isBreaking: a.isBreaking || false, isFeatured: a.isFeatured || false,
            status: a.status || 'DRAFT',
          });
        }
      }
      setLoading(false);
    }
    loadData();
  }, [articleId, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const url = isEdit ? `/api/v1/articles/${articleId}` : '/api/v1/articles';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to save.'); setSaving(false); return; }
      setSuccess(isEdit ? 'Article updated!' : 'Article created!');
      if (!isEdit) {
        router.push(`/admin/articles/${data.article.id}/edit`);
        router.refresh();
      }
    } catch { setError('Network error.'); }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const res = await fetch(`/api/v1/articles/${articleId}`, { method: 'DELETE' });
    if (res.ok) { router.push('/admin/articles'); router.refresh(); }
  }

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '1rem', border: '1px solid #fecaca' }}>{error}</div>}
      {success && <div style={{ background: '#f0fdf4', color: '#166534', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>{success}</div>}

      <div className="form-group">
        <label className="form-label" htmlFor="article-title">Title *</label>
        <input id="article-title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="article-category">Category *</label>
          <select id="article-category" className="form-select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="article-author">Author *</label>
          <select id="article-author" className="form-select" value={form.authorId} onChange={(e) => setForm({ ...form, authorId: e.target.value })} required>
            <option value="">Select author</option>
            {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="article-excerpt">Excerpt</label>
        <textarea id="article-excerpt" className="form-textarea" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Short summary of the article" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="article-content">Content * (HTML)</label>
        <textarea id="article-content" className="form-textarea" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={15} placeholder="Write article content in HTML..." style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="article-image">Featured Image URL</label>
        <input id="article-image" className="form-input" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} placeholder="https://..." />
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.isBreaking} onChange={(e) => setForm({ ...form, isBreaking: e.target.checked })} />
          Breaking News
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
          Featured Story
        </label>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="article-status">Status</label>
        <select id="article-status" className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ maxWidth: '200px' }}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="UNPUBLISHED">Unpublished</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
          {saving ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
        </button>
        <button type="button" className="btn btn-secondary btn-lg" onClick={() => router.push('/admin/articles')}>Cancel</button>
        {isEdit && (
          <button type="button" className="btn btn-lg" style={{ background: '#fef2f2', color: '#dc2626', marginLeft: 'auto' }} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
