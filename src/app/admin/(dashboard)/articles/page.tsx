import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Articles</h1>
        <Link href="/admin/articles/new" className="btn btn-primary">New Article</Link>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)' }}>
              {['Title', 'Category', 'Author', 'Status', 'Breaking', 'Featured', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 500, maxWidth: '300px' }}>
                  {a.title.length > 55 ? a.title.substring(0, 55) + '...' : a.title}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{a.category.name}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{a.author.name}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '3px 8px', borderRadius: '4px',
                    background: a.status === 'PUBLISHED' ? '#dcfce7' : a.status === 'DRAFT' ? '#fef3c7' : '#fee2e2',
                    color: a.status === 'PUBLISHED' ? '#166534' : a.status === 'DRAFT' ? '#92400e' : '#991b1b',
                  }}>
                    {a.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem' }}>{a.isBreaking ? 'Yes' : '-'}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem' }}>{a.isFeatured ? 'Yes' : '-'}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <Link href={`/admin/articles/${a.id}/edit`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 500 }}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-tertiary)' }}>
            No articles yet. Create your first article.
          </div>
        )}
      </div>
    </div>
  );
}
