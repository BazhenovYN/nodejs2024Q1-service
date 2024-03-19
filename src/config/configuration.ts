const DEFAULT_PORT = 4000;
const DEFAULT_SALT = 10;
const DEFAULT_LOG_LEVEL = 0;
const DEFAULT_MAX_LOG_FILE_SIZE = 1048576; // 1048576 bytes=1MB

export const appConfig = () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
  salt: process.env.CRYPT_SALT ? parseInt(process.env.CRYPT_SALT, 10) : DEFAULT_SALT,
  logLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL, 10) : DEFAULT_LOG_LEVEL,
  logDir: process.env.LOG_DIR ?? './logs',
  maxLogFileSizeBytes: process.env.MAX_LOG_FILE_SIZE_KB
    ? parseInt(process.env.MAX_LOG_FILE_SIZE_KB, 10) * 1024
    : DEFAULT_MAX_LOG_FILE_SIZE,
  databaseUrl: process.env.DATABASE_URL ?? '',
});

export type AppConfigType = ReturnType<typeof appConfig>;
