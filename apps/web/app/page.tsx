const quickActions = [
  ["🏠", "Live", "Housing & roommates"],
  ["💼", "Work", "Jobs & hiring"],
  ["🛍", "Shop", "Buy, sell, cars"],
  ["🍽", "Eat", "Restaurants & groceries"],
  ["🤝", "Connect", "Churches, mosques, students"],
  ["🎉", "Explore", "Events & community"]
];

const cards = [
  { tag: "Housing", title: "2 bedroom apartment", meta: "Silver Spring • $1,850/mo" },
  { tag: "Business", title: "Ethiopian grocery near you", meta: "Open today • Verified" },
  { tag: "Event", title: "Community dinner this weekend", meta: "Toronto • Saturday" }
];

export default function HomePage() {
  return (
    <main className="shell">
      <nav className="nav">
        <div className="logo">Habesha<span>Hub</span></div>
        <div className="nav-actions">
          <a className="btn" href="http://localhost:4000/health">API Health</a>
          <a className="btn primary" href="#">Get Started</a>
        </div>
      </nav>

      <section className="hero">
        <div className="panel">
          <div className="eyebrow">Find. Connect. Thrive.</div>
          <h1>Your community, in one place.</h1>
          <p>
            A trusted platform for Ethiopians and Eritreans in the U.S. and Canada — housing,
            jobs, businesses, events, restaurants, groceries, and community organizations.
          </p>
          <div className="search">
            <input placeholder="Search apartments, jobs, churches, restaurants..." />
            <button className="btn primary">Search</button>
          </div>
          <div className="grid">
            {quickActions.map(([icon, label, desc]) => (
              <div className="tile" key={label}>{icon} {label}<small>{desc}</small></div>
            ))}
          </div>
        </div>

        <aside className="panel city-card">
          <div className="eyebrow">📍 Start local</div>
          <h2>Choose your city first</h2>
          <p>HabeshaHub should feel like your local Habesha community, not a generic directory.</p>
          <div className="stat"><span>DMV</span><strong>Live</strong></div>
          <div className="stat"><span>Toronto</span><strong>Next</strong></div>
          <div className="stat"><span>Seattle</span><strong>Next</strong></div>
        </aside>
      </section>

      <section className="section">
        <h2>Trending near you</h2>
        <div className="cards">
          {cards.map((card) => (
            <article className="card" key={card.title}>
              <span className="badge">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="bottom">
        <button>🏠<br/>Home</button>
        <button>🔍<br/>Discover</button>
        <button className="plus">＋</button>
        <button>💬<br/>Messages</button>
        <button>👤<br/>Me</button>
      </div>
    </main>
  );
}
