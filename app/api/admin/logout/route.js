import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  // Cookie delete karne ke liye uska maxAge 0 kar dete hain
  response.cookies.set({
    name: 'admin_token',
    value: '',
    maxAge: 0,
    path: '/',
  });

  return response;
}