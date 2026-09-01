import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils';
import styles from './FeaturedStory.module.css';

interface FeaturedStoryProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    isBreaking: boolean;
    publishedAt: Date | string | null;
    author: {
      name: string;
      slug: string;
    };
    category: {
      name: string;
      slug: string;
    };
  };
}

export default function FeaturedStory({ article }: FeaturedStoryProps) {
  const articleUrl = `/${article.category.slug}/${article.slug}`;

  return (
    <section className={styles.hero} id="featured-story">
      <Link href={articleUrl} className={styles.heroLink}>
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt={article.title}
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}

        <div className={styles.heroOverlay}>
          {article.isBreaking && (
            <div className={styles.heroBreaking}>
              <span className={styles.heroBreakingDot} />
              Breaking News
            </div>
          )}

          <span className={styles.heroCategory}>
            {article.category.name}
          </span>

          <h2 className={styles.heroTitle}>
            {article.title}
          </h2>

          {article.excerpt && (
            <p className={styles.heroExcerpt}>{article.excerpt}</p>
          )}

          <div className={styles.heroMeta}>
            <span>{article.author.name}</span>
            <span className={styles.heroMetaDot} />
            <time>{formatRelativeTime(article.publishedAt)}</time>
          </div>
        </div>
      </Link>
    </section>
  );
}
