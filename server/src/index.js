import { createApp } from './app.js';
import { env } from './config/env.js';
import { assertDatabaseConnection } from './config/db.js';

async function start() {
  try {
    await assertDatabaseConnection();
    console.log(`Connected to MySQL database "${env.db.database}"`);
  } catch (error) {
    console.error('Could not connect to MySQL. Check your .env settings.');
    console.error(error.message);
    process.exit(1);
  }

  createApp().listen(env.port, () => {
    console.log(`HMAX API listening on http://localhost:${env.port}`);
  });
}

start();
