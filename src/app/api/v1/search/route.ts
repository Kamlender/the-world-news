import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ articles: [], total: 0 });
  }

  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: q } },
        { excerpt: { contains: q } },
        { content: { contains: q } },
      ],
    },
    include: {
      author: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });

  return NextResponse.json({
    articles: articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || a.content.replace(/<[^>]*>/g, '').substring(0, 140) + '...',
      featuredImage: a.featuredImage,
      isBreaking: a.isBreaking,
      publishedAt: a.publishedAt,
      author: a.author,
      category: a.category,
    })),
    total: articles.length,
  });
}
