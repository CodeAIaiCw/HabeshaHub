# HabeshaHub

**Find. Connect. Thrive.**

HabeshaHub is an all-in-one platform for Ethiopians and Eritreans in the United States and Canada.

## Quick Start

```bash
npm install
npm run docker:up
npm run db:generate
npm run db:migrate
npm run dev
```

Then open:

- Web: http://localhost:3000
- API: http://localhost:4000/health
- Adminer: http://localhost:8080
- Meilisearch: http://localhost:7700

## Ports

PostgreSQL is mapped to **5433** to avoid conflicts with existing local PostgreSQL projects.

## Default stack

- Web: Next.js + TypeScript
- API: NestJS + Prisma
- Database: PostgreSQL + PostGIS
- Cache: Redis
- Search: Meilisearch
- Infrastructure: Docker Compose
