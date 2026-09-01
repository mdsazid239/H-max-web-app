import dotenv from 'dotenv';

dotenv.config();

/**
 * Reads an environment variable, falling back to a default.
 * Throws early (on boot, not on the first request) when a required value
 * is missing, so misconfiguration is obvious.
 */
function read(name, fallback = undefined) {
  const value = process.env[name] ?? fallback;

  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(read('PORT', 4000)),
  nodeEnv: read('NODE_ENV', 'development'),
  clientOrigin: read('CLIENT_ORIGIN', 'http://localhost:5173'),

  db: {
    host: read('DB_HOST', 'localhost'),
    port: Number(read('DB_PORT', 3306)),
    user: read('DB_USER', 'root'),
    password: read('DB_PASSWORD', ''),
    database: read('DB_NAME', 'hmax_forex'),
  },
};

export const isProduction = env.nodeEnv === 'production';
