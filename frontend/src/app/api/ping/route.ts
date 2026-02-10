import { NextResponse } from 'next/server';

// This line tells Next.js NOT to cache this route
export const dynamic = 'force-dynamic';

export async function GET() {
  // We use a small JSON object or plain text to keep the response tiny
  return new NextResponse('pong', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}