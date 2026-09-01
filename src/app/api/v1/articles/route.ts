import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { generateSlug, generateUniqueSlug } from '@/lib/utils';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const articles = await prisma.article.findMany({
    include: {
      author: { select: { id: true, name: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, content, excerpt, categoryId, authorId, featuredImage, imageAlt, isBreaking, isFeatured, status } = body;

    if (!title || !content || !categoryId || !authorId) {
      return NextResponse.json({ error: 'Title, content, category, and author are required.' }, { status: 400 });
    }

    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.article.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        categoryId,
        authorId,
        featuredImage: featuredImage || null,
        imageAlt: imageAlt || null,
        isBreaking: isBreaking || false,
        isFeatured: isFeatured || false,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        language: 'en',
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create article.' }, { status: 500 });
  }
}
