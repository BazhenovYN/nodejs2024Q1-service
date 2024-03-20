import { env } from 'node:process';

const DEFAULT_PORT = 4000;
const DEFAULT_SALT = 10;
const DEFAULT_LOG_LEVEL = 0;
const DEFAULT_MAX_LOG_FILE_SIZE_KB = 1024; // 1024KB=1MB
const DEFAULT_LOG_DIR = './logs';
const DEFAULT_JWT_SECRET = '61927fbcc2c571cba9f946ee5f8c1e449348181f322201ae21b4912f1a77ac5b';

const BYTES_PER_KILOBYTE = 1024;

const getInt = (value: string | undefined, defaultValue: number): number => {
  return value ? parseInt(value, 10) : defaultValue;
};

const getStr = (value: string | undefined, defaultValue = ''): string => {
  return value ?? defaultValue;
};

export const appConfig = () => ({
  port: getInt(env.PORT, DEFAULT_PORT),
  salt: getInt(env.CRYPT_SALT, DEFAULT_SALT),
  logLevel: getInt(env.LOG_LEVEL, DEFAULT_LOG_LEVEL),
  logDir: getStr(env.LOG_DIR, DEFAULT_LOG_DIR),
  maxLogFileSizeBytes:
    getInt(env.MAX_LOG_FILE_SIZE_KB, DEFAULT_MAX_LOG_FILE_SIZE_KB) * BYTES_PER_KILOBYTE,
  databaseUrl: getStr(env.DATABASE_URL),
  jwtSecret: getStr(env.JWT_SECRET_KEY, DEFAULT_JWT_SECRET),
});

export type AppConfigType = ReturnType<typeof appConfig>;
