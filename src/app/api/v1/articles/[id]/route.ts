import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: true, category: true, sources: true, seo: true },
  });

  if (!article) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { title, content, excerpt, categoryId, authorId, featuredImage, imageAlt, isBreaking, isFeatured, status } = body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });

    const wasPublished = existing.status === 'PUBLISHED';
    const isNowPublished = status === 'PUBLISHED';

    const article = await prisma.article.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        content: content ?? existing.content,
        excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
        categoryId: categoryId ?? existing.categoryId,
        authorId: authorId ?? existing.authorId,
        featuredImage: featuredImage !== undefined ? featuredImage : existing.featuredImage,
        imageAlt: imageAlt !== undefined ? imageAlt : existing.imageAlt,
        isBreaking: isBreaking !== undefined ? isBreaking : existing.isBreaking,
        isFeatured: isFeatured !== undefined ? isFeatured : existing.isFeatured,
        status: status ?? existing.status,
        publishedAt: !wasPublished && isNowPublished ? new Date() : existing.publishedAt,
      },
    });

    return NextResponse.json({ article });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update.' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ message: 'Article deleted.' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete.' }, { status: 500 });
  }
}
