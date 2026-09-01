import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function GET() {
  const authors = await prisma.author.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json({ authors });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, bio, avatarUrl } = await request.json();
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });

  const slug = generateSlug(name);
  const author = await prisma.author.create({
    data: { name, slug, bio: bio || null, profileImage: avatarUrl || null },
  });

  return NextResponse.json({ author }, { status: 201 });
}
