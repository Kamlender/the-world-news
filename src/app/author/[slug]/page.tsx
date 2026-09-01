import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { generateExcerpt } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ArticleCard from '@/components/public/ArticleCard';
import styles from '../../listing.module.css';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await prisma.author.findUnique({ where: { slug } });
  if (!author) return { title: 'Author Not Found' };
  return {
    title: `Articles by ${author.name}`,
    description: author.bio || `Read all articles by ${author.name} on The World News.`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await prisma.author.findUnique({ where: { slug } });
  if (!author) notFound();

  const articles = await prisma.article.findMany({
    where: { authorId: author.id, status: 'PUBLISHED' },
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
          <span>Author</span>
          <span>/</span>
          <span>{author.name}</span>
        </nav>

        <div className={styles.authorHeader}>
          <div className={styles.authorAvatar}>
            {author.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
          </div>
          <div className={styles.authorInfo}>
            <h1 className={styles.pageTitle}>{author.name}</h1>
            {author.bio && <p className={styles.authorBio}>{author.bio}</p>}
            <p className={styles.articleCount}>{articles.length} article{articles.length !== 1 ? 's' : ''} published</p>
          </div>
        </div>

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
          <div className={styles.noResults}>No articles by this author yet.</div>
        )}
      </main>
      <Footer />
    </>
  );
}
