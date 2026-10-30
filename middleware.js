import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;
  
  const isLoginPage = pathname === '/admin/login';
  const isRegisterPage = pathname === '/admin/register'; // Register page ko allow karne ke liye
  const isResetPasswordPage = pathname === '/admin/reset-password'; // Forgot / Reset Password page ko allow karne ke liye
  const isAdminRoute = pathname.startsWith('/admin');

  // Agar user logged in nahi hai, aur wo admin route par hai, 
  // lekin wo login, register ya reset-password page par NAHI hai, tab hi redirect karein
  if (isAdminRoute && !isLoginPage && !isRegisterPage && !isResetPasswordPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Agar user pehle se logged in hai aur login/register page par jaane ki koshish kare
  if ((isLoginPage || isRegisterPage) && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
