import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set('accept', 'application/json');
  response.headers.set('Authorization', process.env.AUTH_KEY || '');

  return response;
}