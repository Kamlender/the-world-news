import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { generateExcerpt } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ArticleCard from '@/components/public/ArticleCard';
import styles from '../listing.module.css';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await prisma.category.findUnique({ where: { slug: category } });
  if (!cat) return { title: 'Category Not Found' };
  return {
    title: `${cat.name} News`,
    description: cat.description || `Latest ${cat.name} news and updates on NewsHub.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = await prisma.category.findUnique({ where: { slug: category } });
  if (!cat) notFound();

  const articles = await prisma.article.findMany({
    where: { categoryId: cat!.id, status: 'PUBLISHED' },
    include: {
      author: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 30,
  });

  return (
    <>
      <Header />
      <main className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/" className={styles.breadcrumbLink}>Home</a>
          <span>/</span>
          <span>{cat!.name}</span>
        </nav>

        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{cat!.name}</h1>
          {cat!.description && <p className={styles.pageDesc}>{cat!.description}</p>}
        </header>

        {articles.length > 0 ? (
          <div className={styles.grid}>
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                article={{ ...a, excerpt: a.excerpt || generateExcerpt(a.content, 120) }}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>No articles found in this category.</div>
        )}
      </main>
      <Footer />
    </>
  );
}
