import prisma from '@/lib/prisma';

export default async function AdminDashboard() {
  const [articleCount, publishedCount, draftCount, categoryCount, authorCount] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.count({ where: { status: 'DRAFT' } }),
    prisma.category.count(),
    prisma.author.count(),
  ]);

  const recentArticles = await prisma.article.findMany({
    include: { author: { select: { name: true } }, category: { select: { name: true } } },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  const stats = [
    { label: 'Total Articles', value: articleCount, color: '#3b82f6' },
    { label: 'Published', value: publishedCount, color: '#10b981' },
    { label: 'Drafts', value: draftCount, color: '#f59e0b' },
    { label: 'Categories', value: categoryCount, color: '#8b5cf6' },
    { label: 'Authors', value: authorCount, color: '#ec4899' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>Dashboard</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginTop: '0.25rem' }}>Overview of your news platform</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: '#fff', borderRadius: '12px', padding: '1.25rem',
            border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {s.label}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, marginTop: '0.25rem' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700, fontSize: '0.95rem' }}>
          Recent Articles
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)' }}>
              <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Title</th>
              <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Author</th>
              <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentArticles.map((article) => (
              <tr key={article.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  <a href={`/admin/articles/${article.id}/edit`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
                    {article.title.length > 60 ? article.title.substring(0, 60) + '...' : article.title}
                  </a>
                </td>
                <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{article.category.name}</td>
                <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{article.author.name}</td>
                <td style={{ padding: '0.75rem 1.25rem' }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '3px 8px', borderRadius: '4px',
                    background: article.status === 'PUBLISHED' ? '#dcfce7' : '#fef3c7',
                    color: article.status === 'PUBLISHED' ? '#166534' : '#92400e',
                  }}>
                    {article.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
