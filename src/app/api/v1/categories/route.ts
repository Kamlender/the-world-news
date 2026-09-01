import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, description } = await request.json();
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });

  const slug = generateSlug(name);
  const maxOrder = await prisma.category.aggregate({ _max: { sortOrder: true } });

  const category = await prisma.category.create({
    data: { name, slug, description: description || null, sortOrder: (maxOrder._max.sortOrder || 0) + 1 },
  });

  return NextResponse.json({ category }, { status: 201 });
}
