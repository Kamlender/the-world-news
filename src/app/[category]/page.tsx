import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { generateExcerpt } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ArticleCard from '@/components/public/ArticleCard';
import styles from '../listing.module.css';

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { status: 'ACTIVE' },
    select: { slug: true },
  });
  return categories.map((c) => ({ category: c.slug }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/* Default SEO descriptions for categories (used when DB description is empty) */
const CATEGORY_SEO: Record<string, { title: string; description: string; intro: string }> = {
  india: {
    title: 'Latest India News, Headlines & Breaking Updates Today',
    description: 'Read the latest India news, breaking headlines, government policy updates, state news, and national stories. Stay informed with The World News.',
    intro: 'Stay up to date with the most important news from across India. From government policy decisions and political developments to social issues, state elections, education reforms, and economic updates — The World News brings you comprehensive, well-sourced coverage of events shaping the nation. Our editorial team works around the clock to ensure accuracy and accountability in every story we publish.',
  },
  world: {
    title: 'Latest World News, International Headlines & Global Updates',
    description: 'Read the latest world news, international headlines, geopolitics, diplomacy, and global events. Stay informed with The World News.',
    intro: 'Explore the latest developments from around the globe. The World News covers international diplomacy, geopolitical conflicts, trade agreements, humanitarian crises, climate change, and major events across every continent. Our correspondents and editorial team bring you balanced, trustworthy reporting on the stories that matter most in an increasingly interconnected world.',
  },
  politics: {
    title: 'Latest Political News, Government Updates & Policy Analysis',
    description: 'Read the latest political news, government decisions, election updates, parliamentary proceedings, and policy analysis on The World News.',
    intro: 'Follow the latest political developments, parliamentary sessions, election updates, and policy decisions from India and across the world. The World News delivers in-depth political analysis, unbiased reporting on government actions, opposition responses, judicial verdicts, and the evolving political landscape. Our journalism is grounded in facts, transparency, and editorial accountability.',
  },
  business: {
    title: 'Latest Business News, Market Updates & Economy Reports',
    description: 'Read the latest business news, stock market updates, corporate earnings, startup news, GDP data, and economic analysis on The World News.',
    intro: 'Get the latest business and economic news including stock market movements, corporate earnings, startup funding rounds, GDP growth data, RBI monetary policy, trade developments, and industry analysis. The World News provides accurate, timely business journalism that helps professionals, investors, and entrepreneurs make informed decisions in a rapidly changing economic landscape.',
  },
  technology: {
    title: 'Latest Technology News, Gadget Reviews & Digital Trends',
    description: 'Read the latest technology news, gadget launches, AI developments, startup news, cybersecurity updates, and digital innovation on The World News.',
    intro: 'Discover the latest in technology, from artificial intelligence breakthroughs and smartphone launches to cybersecurity threats, social media policy changes, and emerging tech startups. The World News technology section keeps you informed about the innovations and digital trends transforming how we live, work, and communicate in the modern world.',
  },
  sports: {
    title: 'Latest Sports News, Live Scores, Results & Match Updates',
    description: 'Read the latest sports news, live scores, match results, player transfers, cricket, football, tennis, and Olympic coverage on The World News.',
    intro: 'Follow the latest sports news from cricket, football, tennis, badminton, hockey, and the Olympics. The World News sports section delivers match results, player transfer updates, tournament schedules, expert analysis, and exclusive stories from the world of athletics. Whether it is the IPL, FIFA World Cup, or the Asian Games — stay ahead with fast and reliable sports journalism.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await prisma.category.findUnique({ where: { slug: category } });
  if (!cat) return { title: 'Category Not Found' };

  const seo = CATEGORY_SEO[cat.slug];
  const title = seo?.title || `Latest ${cat.name} News, Headlines & Updates Today`;
  const description = seo?.description || cat.description || `Read the latest ${cat.name} news and updates. Breaking headlines and in-depth stories on The World News.`;

  return {
    title,
    description,
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

  const seo = CATEGORY_SEO[cat!.slug];
  const introText = seo?.intro || cat!.description || `Explore the latest ${cat!.name} stories, breaking headlines, and in-depth articles curated by The World News editorial team. We are committed to delivering accurate, well-sourced journalism on every topic that matters to our readers.`;

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
          <p className={styles.pageDesc}>{introText}</p>
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

