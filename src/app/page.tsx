import Link from 'next/link';
import prisma from '@/lib/prisma';
import { generateExcerpt } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import BreakingNewsTicker from '@/components/public/BreakingNewsTicker';
import FeaturedStory from '@/components/public/FeaturedStory';
import ArticleCard from '@/components/public/ArticleCard';
import styles from './homepage.module.css';

// Revalidate homepage every 60 seconds
export const revalidate = 60;

async function getHomepageData() {
  // Breaking news articles
  const breakingArticles = await prisma.article.findMany({
    where: { isBreaking: true, status: 'PUBLISHED' },
    include: {
      author: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 5,
  });

  // Featured story
  const featuredStory = await prisma.article.findFirst({
    where: { isFeatured: true, status: 'PUBLISHED' },
    include: {
      author: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
  });

  // Latest articles (excluding featured)
  const latestArticles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      id: featuredStory ? { not: featuredStory.id } : undefined,
    },
    include: {
      author: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  });

  // Category-wise articles
  const categories = await prisma.category.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { sortOrder: 'asc' },
  });

  const categoryArticles = await Promise.all(
    categories.map(async (category) => {
      const articles = await prisma.article.findMany({
        where: {
          categoryId: category.id,
          status: 'PUBLISHED',
        },
        include: {
          author: { select: { name: true, slug: true } },
          category: { select: { name: true, slug: true } },
        },
        orderBy: { publishedAt: 'desc' },
        take: 4,
      });
      return { category, articles };
    })
  );

  return {
    breakingArticles,
    featuredStory,
    latestArticles,
    categoryArticles: categoryArticles.filter((ca) => ca.articles.length > 0),
  };
}

export default async function HomePage() {
  const { breakingArticles, featuredStory, latestArticles, categoryArticles } =
    await getHomepageData();

  // Add excerpts from content if missing
  const withExcerpts = (articles: typeof latestArticles) =>
    articles.map((a) => ({
      ...a,
      excerpt: a.excerpt || generateExcerpt(a.content, 140),
    }));

  return (
    <>
      <Header />
      <BreakingNewsTicker articles={breakingArticles} />

      <main>
        <div className={styles.mainContent}>
          {/* Featured Story Hero */}
          {featuredStory && (
            <div style={{ marginTop: 'var(--space-6)' }}>
              <FeaturedStory
                article={{
                  ...featuredStory,
                  excerpt:
                    featuredStory.excerpt ||
                    generateExcerpt(featuredStory.content, 200),
                }}
              />
            </div>
          )}

          {/* Latest News */}
          <section className={styles.section} id="latest-news">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Latest News</h2>
            </div>
            <div className={styles.latestGrid}>
              {withExcerpts(latestArticles).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>

        {/* Category Sections */}
        {categoryArticles.map((catData, index) => (
          <section
            key={catData.category.id}
            className={
              index % 2 === 0
                ? styles.categorySection
                : styles.categorySectionAlt
            }
            id={`section-${catData.category.slug}`}
          >
            <div className={styles.mainContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  {catData.category.name}
                </h2>
                <Link
                  href={`/${catData.category.slug}`}
                  className={styles.sectionViewAll}
                >
                  View All
                </Link>
              </div>
              <div className={styles.categoryGrid}>
                {withExcerpts(catData.articles).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}
