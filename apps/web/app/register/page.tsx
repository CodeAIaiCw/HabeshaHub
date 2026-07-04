'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, AuthResponse, saveSession } from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(event.currentTarget);
    try {
      const auth = await apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName: form.get('firstName'),
          lastName: form.get('lastName'),
          email: form.get('email'),
          password: form.get('password'),
        }),
      });
      saveSession(auth);
      router.push('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual red-visual">
        <a className="logo light-logo" href="/">Habesha<span>Hub</span></a>
        <div>
          <div className="eyebrow light">Join the platform</div>
          <h1>Everything Habesha, one account.</h1>
          <p>Create your free account to save listings, message people, post opportunities, and personalize your city experience.</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <h2>Create account</h2>
          <p>Start with a free community profile.</p>
          <form onSubmit={onSubmit} className="form-stack">
            <div className="two-cols">
              <label>First name<input name="firstName" required placeholder="Haile" /></label>
              <label>Last name<input name="lastName" required placeholder="Tesfaye" /></label>
            </div>
            <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
            <label>Password<input name="password" type="password" required minLength={8} placeholder="At least 8 characters" /></label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn primary wide" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p className="small-center">Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </section>
    </main>
  );
}
