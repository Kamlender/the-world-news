import { PrismaClient } from '@prisma/client';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import slugify from 'slugify';
import crypto from 'crypto';

const prisma = new PrismaClient();
const parser = new Parser({
  customFields: {
    item: ['description', 'content', 'pubDate'],
  }
});

const CATEGORIES = [
  { name: 'India', slug: 'india', rssUrl: 'https://news.google.com/rss/search?q=India&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'World', slug: 'world', rssUrl: 'https://news.google.com/rss/search?q=World+News&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'Politics', slug: 'politics', rssUrl: 'https://news.google.com/rss/search?q=Politics&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'Business', slug: 'business', rssUrl: 'https://news.google.com/rss/search?q=Business&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'Technology', slug: 'technology', rssUrl: 'https://news.google.com/rss/search?q=Technology&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'Sports', slug: 'sports', rssUrl: 'https://news.google.com/rss/search?q=Sports&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'Entertainment', slug: 'entertainment', rssUrl: 'https://news.google.com/rss/search?q=Entertainment&hl=en-IN&gl=IN&ceid=IN:en' },
  { name: 'Science', slug: 'science', rssUrl: 'https://news.google.com/rss/search?q=Science&hl=en-IN&gl=IN&ceid=IN:en' },
];

async function extractOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();
    const $ = cheerio.load(html);
    let image = $('meta[property="og:image"]').attr('content');
    if (!image) {
      image = $('meta[name="twitter:image"]').attr('content');
    }
    return image || null;
  } catch (error) {
    console.error(`Failed to scrape image for ${url}`, error);
    return null;
  }
}

async function fetchNews() {
  console.log('Starting automated news fetch...');

  // Ensure "Google News Bot" author exists
  let botAuthor = await prisma.author.findUnique({ where: { slug: 'google-news-bot' } });
  if (!botAuthor) {
    botAuthor = await prisma.author.create({
      data: {
        name: 'Google News Bot',
        slug: 'google-news-bot',
        bio: 'Automated news curation from top publishers.',
        status: 'ACTIVE'
      }
    });
  }

  for (const cat of CATEGORIES) {
    console.log(`Fetching news for category: ${cat.name}...`);
    
    // Ensure category exists
    let category = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!category) {
      category = await prisma.category.create({
        data: { name: cat.name, slug: cat.slug }
      });
    }

    try {
      const feed = await parser.parseURL(cat.rssUrl);
      // Fetch top 5 articles per category to avoid overwhelming DB/API
      const items = feed.items.slice(0, 5);

      for (const item of items) {
        if (!item.title || !item.link) continue;

        // Clean Google News title (often ends with " - Publisher Name")
        const cleanTitle = item.title.replace(/\s-\s[^-]+$/, '');
        
        // Generate a unique slug
        let baseSlug = slugify(cleanTitle, { lower: true, strict: true, trim: true });
        // Max slug length is usually restricted, keep it reasonable
        baseSlug = baseSlug.substring(0, 60);
        
        const existingArticle = await prisma.article.findFirst({
          where: {
            OR: [
              { title: cleanTitle },
              { slug: baseSlug }
            ]
          }
        });

        if (existingArticle) {
          console.log(`Skipping existing article: ${cleanTitle}`);
          continue; // Skip if we already imported it
        }

        console.log(`Processing new article: ${cleanTitle}`);

        // Fetch high-quality image from the source URL
        const ogImage = await extractOgImage(item.link);
        
        // Ensure slug uniqueness
        const uniqueSlug = `${baseSlug}-${crypto.randomBytes(3).toString('hex')}`;

        // Prepare content (Link to source)
        const summary = item.contentSnippet || item.description || cleanTitle;
        const htmlContent = `
          <p>${summary}</p>
          <p><em>Read the full article at the original source: <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.link}</a></em></p>
        `;

        await prisma.article.create({
          data: {
            title: cleanTitle,
            slug: uniqueSlug,
            excerpt: summary.substring(0, 150) + '...',
            content: htmlContent,
            featuredImage: ogImage || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80', // Fallback news image
            imageAlt: cleanTitle,
            authorId: botAuthor.id,
            categoryId: category.id,
            status: 'PUBLISHED',
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            language: 'en',
            sources: {
              create: [
                {
                  name: 'Google News',
                  url: item.link,
                  sourceType: 'NEWS_AGENCY'
                }
              ]
            },
            seo: {
              create: {
                seoTitle: cleanTitle.substring(0, 60),
                metaDescription: summary.substring(0, 150),
                ogTitle: cleanTitle.substring(0, 60),
                ogDescription: summary.substring(0, 150),
                ogImage: ogImage || ''
              }
            }
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching category ${cat.name}:`, error);
    }
  }

  console.log('Automated news fetch completed.');
}

fetchNews()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
