const DEFAULT_PORT = 4000;

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
});
