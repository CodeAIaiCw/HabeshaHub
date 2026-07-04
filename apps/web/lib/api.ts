export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  cityId?: string | null;
  city?: { id: string; name: string; region: string; country: string; slug: string } | null;
  language: 'EN' | 'AM';
  interests: string[];
  onboardingCompleted: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('hh_access_token') : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Request failed. Please try again.');
  }

  return data as T;
}

export function saveSession(auth: AuthResponse) {
  localStorage.setItem('hh_access_token', auth.accessToken);
  localStorage.setItem('hh_user', JSON.stringify(auth.user));
}

export function clearSession() {
  localStorage.removeItem('hh_access_token');
  localStorage.removeItem('hh_user');
}

export function getCachedUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('hh_user');
  if (!raw) return null;
  try { return JSON.parse(raw) as AuthUser; } catch { return null; }
}
