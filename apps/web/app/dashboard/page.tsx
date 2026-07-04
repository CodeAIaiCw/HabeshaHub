'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, AuthUser, clearSession } from '../../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<AuthUser>('/auth/me')
      .then(setUser)
      .catch(() => router.push('/login'));
  }, [router]);

  function logout() {
    clearSession();
    router.push('/');
  }

  if (!user) return <main className="center-screen"><div className="spinner" />Loading your HabeshaHub...</main>;

  return (
    <main className="dashboard shell">
      <nav className="top-nav inside">
        <a className="logo" href="/dashboard">Habesha<span>Hub</span></a>
        <button className="btn" onClick={logout}>Log out</button>
      </nav>

      <section className="dashboard-hero">
        <div>
          <div className="eyebrow light">📍 {user.city?.name ?? 'Your City'}</div>
          <h1>Good afternoon, {user.firstName} 👋</h1>
          <p>Welcome back. Find housing, jobs, businesses, events, and trusted community connections near you.</p>
        </div>
        <div className="trust-card">
          <strong>Community Profile</strong>
          <span>✓ Email added</span>
          <span>✓ Language: {user.language}</span>
          <span>{user.onboardingCompleted ? '✓ Onboarding complete' : '○ Complete onboarding'}</span>
        </div>
      </section>

      <section className="search-card dashboard-search">
        <input placeholder="Search anything in your community..." />
        <button className="btn primary">Search</button>
      </section>

      <section className="action-grid dashboard-grid">
        {['🏠 Housing', '💼 Jobs', '🍽 Restaurants', '🛍 Marketplace', '🎉 Events', '🤝 Community'].map((label) => (
          <article className="action-card" key={label}><h3>{label}</h3><p>Explore local opportunities.</p></article>
        ))}
      </section>

      {error && <div className="form-error">{error}</div>}
    </main>
  );
}
