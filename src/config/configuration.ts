const DEFAULT_PORT = 4000;
const DEFAULT_SALT = 10;
const DEFAULT_LOG_LEVEL = 0;

export const appConfig = () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
  salt: process.env.CRYPT_SALT ? parseInt(process.env.CRYPT_SALT, 10) : DEFAULT_SALT,
  logLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL, 10) : DEFAULT_LOG_LEVEL,
  databaseUrl: process.env.DATABASE_URL ?? '',
});

export type AppConfigType = ReturnType<typeof appConfig>;
