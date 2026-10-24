import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Agar user logged in nahi hai aur admin route access kar raha hai
  if (isAdminRoute && !isAuthPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Agar user logged in hai aur login page par jaa raha hai
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};