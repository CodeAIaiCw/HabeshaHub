export default () => ({
  app: {
    name: 'HabeshaHub',
    port: parseInt(process.env.PORT ?? '4000', 10),
    env: process.env.NODE_ENV ?? 'development',
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  redis: {
    url: process.env.REDIS_URL,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '15m',
    refreshExpiresIn: '30d',
  },
});