import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
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
  variant?: 'default' | 'horizontal' | 'large';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const articleUrl = `/${article.category.slug}/${article.slug}`;

  const cardClass = [
    styles.card,
    variant === 'horizontal' ? styles.cardHorizontal : '',
    variant === 'large' ? styles.cardLarge : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClass} id={`article-card-${article.id}`}>
      {/* Image */}
      <Link href={articleUrl} className={styles.imageWrap} aria-hidden="true" tabIndex={-1}>
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt={article.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            {article.category.name.charAt(0)}
          </div>
        )}
        {article.isBreaking && (
          <span className={styles.breakingBadge}>Breaking</span>
        )}
      </Link>

      {/* Body */}
      <div className={styles.body}>
        <Link href={`/${article.category.slug}`} className={styles.categoryLink}>
          {article.category.name}
        </Link>

        <h3 className={styles.title}>
          <Link href={articleUrl} className={styles.titleLink}>
            {article.title}
          </Link>
        </h3>

        {article.excerpt && variant !== 'horizontal' && (
          <p className={styles.excerpt}>{article.excerpt}</p>
        )}

        <div className={styles.meta}>
          <Link href={`/author/${article.author.slug}`} className={styles.authorLink}>
            {article.author.name}
          </Link>
          <span className={styles.metaDot} />
          <time>{formatRelativeTime(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}
