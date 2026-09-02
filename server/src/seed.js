// src/seed.js
// Run with: npm run seed
//
// Seeds the `currencies` table. Uses charset: 'utf8mb4' on the connection
// so the flag emoji are stored correctly (this is the actual fix for the
// "????" issue — the emoji were fine, the connection/column charset wasn't).
//
// If you already have a shared connection/pool file (e.g. src/config/db.js),
// tell me its path and export shape and I'll switch this to import that
// instead of creating its own connection here.

import 'dotenv/config';
import mysql from 'mysql2/promise';

const CURRENCIES = [
  { code: 'AED', name: 'UAE Dirham', flagEmoji: '🇦🇪', isPopular: 1, displayOrder: 1 },
  { code: 'AUD', name: 'Australian Dollar', flagEmoji: '🇦🇺', isPopular: 1, displayOrder: 2 },
  { code: 'CHF', name: 'Swiss Franc', flagEmoji: '🇨🇭', isPopular: 0, displayOrder: 3 },
  { code: 'EUR', name: 'Euro', flagEmoji: '🇪🇺', isPopular: 1, displayOrder: 4 },
  { code: 'GBP', name: 'Pound Sterling', flagEmoji: '🇬🇧', isPopular: 1, displayOrder: 5 },
  { code: 'USD', name: 'US Dollar', flagEmoji: '🇺🇸', isPopular: 1, displayOrder: 6 },
  { code: 'CAD', name: 'Canadian Dollar', flagEmoji: '🇨🇦', isPopular: 0, displayOrder: 7 },
  { code: 'SGD', name: 'Singapore Dollar', flagEmoji: '🇸🇬', isPopular: 0, displayOrder: 8 },
  { code: 'JPY', name: 'Japanese Yen', flagEmoji: '🇯🇵', isPopular: 0, displayOrder: 9 },
  { code: 'THB', name: 'Thai Baht', flagEmoji: '🇹🇭', isPopular: 0, displayOrder: 10 },
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'hmax_forex',
    charset: 'utf8mb4', // <-- required for emoji to store/read correctly
  });

  try {
    console.log('Connected. Ensuring utf8mb4 on the currencies table...');

    await connection.query(
      `ALTER TABLE currencies CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );

    console.log('Seeding currencies...');

    for (const c of CURRENCIES) {
      await connection.query(
        `INSERT INTO currencies (code, name, flag_emoji, is_popular, display_order)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           flag_emoji = VALUES(flag_emoji),
           is_popular = VALUES(is_popular),
           display_order = VALUES(display_order)`,
        [c.code, c.name, c.flagEmoji, c.isPopular, c.displayOrder],
      );
      console.log(`  ✓ ${c.code} ${c.flagEmoji}`);
    }

    console.log('Seed complete.');
  } finally {
    await connection.end();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});