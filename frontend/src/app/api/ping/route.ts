import { NextResponse } from 'next/server';

export async function GET() {
  // We use a small JSON object or plain text to keep the response tiny
  return new NextResponse('pong', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}