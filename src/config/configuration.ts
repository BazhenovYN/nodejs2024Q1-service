const DEFAULT_PORT = 4000;
const DEFAULT_SALT = 10;

export const appConfig = () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
  salt: process.env.CRYPT_SALT ? parseInt(process.env.CRYPT_SALT, 10) : DEFAULT_SALT,
});

export type AppConfigType = ReturnType<typeof appConfig>;
