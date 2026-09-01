import Link from 'next/link';
import styles from './BreakingNewsTicker.module.css';

interface BreakingArticle {
  id: string;
  title: string;
  slug: string;
  category: {
    slug: string;
  };
}

interface BreakingNewsTickerProps {
  articles: BreakingArticle[];
}

export default function BreakingNewsTicker({ articles }: BreakingNewsTickerProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Duplicate items for seamless infinite scroll
  const duplicatedArticles = [...articles, ...articles];

  return (
    <div className={styles.ticker} id="breaking-news-ticker" role="marquee" aria-label="Breaking News">
      <div className={styles.tickerInner}>
        <div className={styles.tickerLabel}>
          <span className={styles.tickerDot} />
          Breaking
        </div>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerScroll}>
            {duplicatedArticles.map((article, index) => (
              <div className={styles.tickerItem} key={`${article.id}-${index}`}>
                <Link
                  href={`/${article.category.slug}/${article.slug}`}
                  className={styles.tickerLink}
                >
                  {article.title}
                </Link>
                {index < duplicatedArticles.length - 1 && (
                  <span className={styles.tickerSeparator} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
