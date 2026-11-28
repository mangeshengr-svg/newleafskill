import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  const isDirectAdminLogin = pathname === '/admin/login';
  const isInternalConsole = pathname === '/internal-console';
  const isRegisterPage = pathname === '/admin/register';
  const isResetPasswordPage = pathname === '/admin/reset-password';
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');

  // Direct access to /admin/login is strictly blocked (redirect to 404 or home)
  if (isDirectAdminLogin) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  // API protection: /api/admin/*
  if (isAdminApiRoute) {
    // Whitelist login and logout
    if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
      return NextResponse.next();
    }
    // Block unauthenticated access to admin APIs
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Page protection: /admin/*
  // Agar user logged in nahi hai, aur wo admin route par hai, 
  // lekin wo internal-console, register ya reset-password page par NAHI hai, tab hi redirect karein
  if (isAdminRoute && !isInternalConsole && !isRegisterPage && !isResetPasswordPage && !token) {
    return NextResponse.redirect(new URL('/internal-console', request.url));
  }

  // Agar user pehle se logged in hai aur login/register page par jaane ki koshish kare
  if ((isInternalConsole || isRegisterPage) && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/internal-console'],
};
