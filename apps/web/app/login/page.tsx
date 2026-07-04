'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, AuthResponse, saveSession } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(event.currentTarget);
    try {
      const auth = await apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
      });
      saveSession(auth);
      router.push(auth.user.onboardingCompleted ? '/dashboard' : '/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <a className="logo light-logo" href="/">Habesha<span>Hub</span></a>
        <div>
          <div className="eyebrow light">Welcome back</div>
          <h1>Sign in to your community.</h1>
          <p>Continue your search for housing, jobs, businesses, events, and trusted local connections.</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <h2>Sign in</h2>
          <p>Access your personalized HabeshaHub experience.</p>
          <form onSubmit={onSubmit} className="form-stack">
            <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
            <label>Password<input name="password" type="password" required minLength={8} placeholder="••••••••" /></label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn primary wide" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
          <p className="small-center">New here? <a href="/register">Create an account</a></p>
        </div>
      </section>
    </main>
  );
}
