import mysql from 'mysql2/promise';
import { env } from './env.js';

/**
 * A single shared connection pool. Every model imports this rather than
 * opening its own connection.
 */
export const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Z',
  charset: 'utf8mb4',
  // Return DECIMAL columns as JavaScript numbers instead of strings so the
  // frontend can format them without extra parsing.
  decimalNumbers: true,
});

/** Runs a query and returns only the rows. */
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/** Runs a query expected to return at most one row. */
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}

/** Verifies the database is reachable. Called once during startup. */
export async function assertDatabaseConnection() {
  const connection = await pool.getConnection();
  connection.release();
}