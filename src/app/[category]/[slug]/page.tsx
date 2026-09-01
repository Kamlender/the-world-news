import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { formatDateTime, generateExcerpt } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ArticleCard from '@/components/public/ArticleCard';
import styles from './article.module.css';

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, category: { select: { slug: true } } },
  });
  return articles.map((a) => ({ category: a.category.slug, slug: a.slug }));
}

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

async function getArticle(slug: string) {
  return prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: {
      author: true,
      category: true,
      sources: true,
      seo: true,
    },
  });
}

async function getRelatedArticles(categoryId: string, articleId: string) {
  return prisma.article.findMany({
    where: {
      categoryId,
      status: 'PUBLISHED',
      id: { not: articleId },
    },
    include: {
      author: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 4,
  });
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article Not Found' };

  const description = article.seo?.metaDescription || article.excerpt || generateExcerpt(article.content, 160);
  const title = article.seo?.seoTitle || article.title;

  return {
    title,
    description,
    openGraph: {
      title: article.seo?.ogTitle || title,
      description: article.seo?.ogDescription || description,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author.name],
      images: article.seo?.ogImage || article.featuredImage || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo?.ogTitle || title,
      description: article.seo?.ogDescription || description,
    },
  };
}

const SOURCE_TYPE_LABELS: Record<string, string> = {
  GOVERNMENT_RELEASE: 'Govt. Release',
  OFFICIAL_STATEMENT: 'Official',
  COURT_DOCUMENT: 'Court',
  PRESS_CONFERENCE: 'Press Conf.',
  NEWS_AGENCY: 'Agency',
  ORIGINAL_REPORTING: 'Original',
  OTHER: 'Other',
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.categoryId, article.id);
  const isUpdated = article.updatedAt.getTime() - (article.publishedAt?.getTime() || 0) > 60000;

  const articleUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/${article.category.slug}/${article.slug}`;

  return (
    <>
      <Header />
      <main>
        <article className={styles.articlePage}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href={`/${article.category.slug}`} className={styles.breadcrumbLink}>
              {article.category.name}
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span>{article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title}</span>
          </nav>

          {/* Article Header */}
          <header className={styles.articleHeader}>
            <Link href={`/${article.category.slug}`} className={styles.categoryBadge}>
              {article.category.name}
            </Link>

            <h1 className={styles.articleTitle}>{article.title}</h1>

            {article.excerpt && (
              <p className={styles.articleExcerpt}>{article.excerpt}</p>
            )}

            {/* Trust Bar: Author, Date, Updated */}
            <div className={styles.trustBar}>
              <div className={styles.trustItem}>
                <span className={styles.trustLabel}>By</span>
                <Link href={`/author/${article.author.slug}`} className={styles.authorLink}>
                  {article.author.name}
                </Link>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustLabel}>Published</span>
                <time dateTime={article.publishedAt?.toISOString()}>
                  {formatDateTime(article.publishedAt)}
                </time>
              </div>
              {isUpdated && (
                <div className={styles.trustItem}>
                  <span className={styles.updatedBadge}>
                    Updated: {formatDateTime(article.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className={styles.featuredImage}>
              <img
                src={article.featuredImage}
                alt={article.imageAlt || article.title}
                className={styles.featuredImg}
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className={`${styles.articleBody} article-content`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Sources */}
          {article.sources.length > 0 && (
            <div className={styles.sourcesSection}>
              <h3 className={styles.sourcesTitle}>Sources &amp; References</h3>
              <div className={styles.sourcesList}>
                {article.sources.map((source) => (
                  <div key={source.id} className={styles.sourceItem}>
                    <span className={styles.sourceType}>
                      {SOURCE_TYPE_LABELS[source.sourceType] || source.sourceType}
                    </span>
                    <span>{source.name}</span>
                    {source.url && (
                      <a href={source.url} className={styles.sourceLink} target="_blank" rel="noopener noreferrer">
                        {source.url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className={styles.shareSection}>
            <div className={styles.shareLabel}>Share this article</div>
            <div className={styles.shareButtons}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                Twitter / X
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                Facebook
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Stories</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((a) => (
                <ArticleCard
                  key={a.id}
                  article={{
                    ...a,
                    excerpt: a.excerpt || generateExcerpt(a.content, 120),
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
