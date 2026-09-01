import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>New Article</h1>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', border: '1px solid var(--color-border-light)' }}>
        <ArticleForm />
      </div>
    </div>
  );
}
