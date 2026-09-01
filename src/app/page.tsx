import prisma from '@/lib/prisma';

export default async function HomePage() {
  // Fetch data from database to verify everything works
  const articleCount = await prisma.article.count();
  const categoryCount = await prisma.category.count();
  const authorCount = await prisma.author.count();

  const breakingNews = await prisma.article.findMany({
    where: { isBreaking: true, status: 'PUBLISHED' },
    include: { author: true, category: true },
  });

  const latestArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    include: { author: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '3px solid #dc2626', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#dc2626' }}>
          📰 NewsHub
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.1rem' }}>
          Phase 1 — Foundation Verification ✅
        </p>
      </header>

      {/* Database Stats */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
          📊 Database Status
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#16a34a' }}>{articleCount}</div>
            <div style={{ fontSize: '0.875rem', color: '#166534' }}>Articles</div>
          </div>
          <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{categoryCount}</div>
            <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Categories</div>
          </div>
          <div style={{ background: '#fefce8', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #fef08a' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ca8a04' }}>{authorCount}</div>
            <div style={{ fontSize: '0.875rem', color: '#854d0e' }}>Authors</div>
          </div>
        </div>
      </section>

      {/* Breaking News */}
      {breakingNews.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#dc2626' }}>
            🔴 Breaking News
          </h2>
          {breakingNews.map((article) => (
            <div key={article.id} style={{
              background: '#fef2f2',
              padding: '1.25rem',
              borderRadius: '12px',
              marginBottom: '0.75rem',
              borderLeft: '4px solid #dc2626'
            }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>
                {article.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                {article.category.name} • By {article.author.name} • {article.publishedAt?.toLocaleDateString('en-IN')}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Latest Articles */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
          📋 Latest Articles
        </h2>
        {latestArticles.map((article) => (
          <div key={article.id} style={{
            padding: '1.25rem',
            borderRadius: '12px',
            marginBottom: '0.75rem',
            border: '1px solid #e2e8f0',
            background: '#fff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{
                background: '#1d4ed8',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {article.category.name}
              </span>
              {article.isBreaking && (
                <span style={{
                  background: '#dc2626',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 600
                }}>
                  BREAKING
                </span>
              )}
              {article.isFeatured && (
                <span style={{
                  background: '#f59e0b',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 600
                }}>
                  FEATURED
                </span>
              )}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>
              {article.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
              {article.excerpt?.substring(0, 120)}...
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              By {article.author.name} • {article.publishedAt?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        ))}
      </section>

      {/* Phase 1 Checklist */}
      <section style={{
        background: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
          ✅ Phase 1 Checklist
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[
            'Next.js project initialized',
            'Prisma + SQLite database setup',
            'Database schema (all tables)',
            'Seed data loaded',
            'Global CSS design system',
            'TypeScript types',
            'Utility functions',
            'Environment config',
          ].map((item, i) => (
            <li key={i} style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a' }}>
              <span>✅</span> {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
