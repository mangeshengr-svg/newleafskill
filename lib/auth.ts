import { cookies } from 'next/headers';
// @ts-expect-error jsonwebtoken types not installed in devDependencies
import jwt from 'jsonwebtoken';

export interface AdminPayload {
  id: number;
  email: string;
  name: string;
}

export async function verifyAdminSession(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not configured.');
      return null;
    }

    const decoded = jwt.verify(token, secret) as AdminPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function assertAdmin(): Promise<AdminPayload> {
  const session = await verifyAdminSession();
  if (!session) {
    throw new Error('Unauthorized: Valid admin authentication required.');
  }
  return session;
}
