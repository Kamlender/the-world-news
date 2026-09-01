import ArticleForm from '@/components/admin/ArticleForm';

interface Props { params: Promise<{ id: string }> }

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Edit Article</h1>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', border: '1px solid var(--color-border-light)' }}>
        <ArticleForm articleId={id} />
      </div>
    </div>
  );
}
