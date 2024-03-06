const DEFAULT_PORT = 4000;

export const configuration = () => ({
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
});
