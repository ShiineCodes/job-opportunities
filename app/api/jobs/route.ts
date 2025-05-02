import type { JobRequest } from '@/app/jobs/types';

import { NextRequest, NextResponse } from 'next/server';

async function createJob(req: NextRequest) {
  const body = await req.json();
  const { title, location, description, company, shouldThrow } =
    body as JobRequest;

  if (!title || !location || !description || !company) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  if (shouldThrow) {
    return new NextResponse(null, {
      status: 500,
      statusText: 'Job already exists',
    });
  }

  return new NextResponse(null, {
    status: 204,
    statusText: 'Job added successfully',
  });
}

export const POST = createJob;
