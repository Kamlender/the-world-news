import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
    orderBy: { publishedAt: 'desc' },
  });

  const categories = await prisma.category.findMany({
    where: { status: 'ACTIVE' },
    select: { slug: true },
  });

  const authors = await prisma.author.findMany({
    select: { slug: true },
  });

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1 },
    { url: `${baseUrl}/search`, changeFrequency: 'monthly', priority: 0.5 },
    ...categories.map((c) => ({
      url: `${baseUrl}/${c.slug}`,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
    ...authors.map((a) => ({
      url: `${baseUrl}/author/${a.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${baseUrl}/${a.category.slug}/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
  ];
}
