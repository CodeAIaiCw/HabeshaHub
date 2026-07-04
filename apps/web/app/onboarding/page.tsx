'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, AuthUser, saveSession } from '../../lib/api';

type City = { id: string; name: string; region: string; country: string; slug: string };
const interests = ['HOUSING', 'JOBS', 'BUSINESSES', 'MARKETPLACE', 'EVENTS', 'CHURCHES', 'MOSQUES'];

export default function OnboardingPage() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [cityId, setCityId] = useState('');
  const [language, setLanguage] = useState<'EN' | 'AM'>('EN');
  const [selected, setSelected] = useState<string[]>(['HOUSING', 'JOBS', 'BUSINESSES']);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<City[]>('/cities').then(setCities).catch((err) => setError(err.message));
  }, []);

  function toggle(item: string) {
    setSelected((current) => current.includes(item) ? current.filter((i) => i !== item) : [...current, item]);
  }

  async function finish() {
    setError('');
    try {
      const user = await apiFetch<AuthUser>('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({ cityId, language, interests: selected }),
      });
      const token = localStorage.getItem('hh_access_token') ?? '';
      saveSession({ user, accessToken: token });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to finish onboarding.');
    }
  }

  return (
    <main className="onboarding-page">
      <section className="onboarding-card">
        <a className="logo" href="/">Habesha<span>Hub</span></a>
        <div className="eyebrow">Personalize your hub</div>
        <h1>Choose your city and interests.</h1>
        <p>Your homepage will become your local Habesha community.</p>

        <div className="form-stack">
          <label>City
            <select value={cityId} onChange={(e) => setCityId(e.target.value)} required>
              <option value="">Select city</option>
              {cities.map((city) => <option value={city.id} key={city.id}>{city.name} — {city.region}</option>)}
            </select>
          </label>

          <div>
            <label>Language</label>
            <div className="pill-row">
              <button type="button" className={language === 'EN' ? 'pill active' : 'pill'} onClick={() => setLanguage('EN')}>English</button>
              <button type="button" className={language === 'AM' ? 'pill active' : 'pill'} onClick={() => setLanguage('AM')}>አማርኛ</button>
            </div>
          </div>

          <div>
            <label>Interests</label>
            <div className="interest-grid">
              {interests.map((item) => (
                <button type="button" key={item} className={selected.includes(item) ? 'interest active' : 'interest'} onClick={() => toggle(item)}>
                  {item.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}
          <button className="btn primary wide" onClick={finish} disabled={!cityId}>Continue to Dashboard</button>
        </div>
      </section>
    </main>
  );
}
