import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // Halaman yang butuh login
  const protectedRoutes = ['/dashboard', '/tambah-hiburan', '/edit-hiburan'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Halaman login/daftar (tidak boleh diakses jika sudah login)
  const authRoutes = ['/login', '/daftar'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/tambah-hiburan/:path*', '/edit-hiburan/:path*', '/login', '/daftar'],
};
