import { query } from '../config/db.js';

/** Stores a contact form submission and returns its id. */
export async function createContactMessage({ name, email, phone, message }) {
  const result = await query(
    'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
    [name, email, phone, message],
  );
  return result.insertId;
}

/** Branch details for the contact page and footer. */
export function findBranches() {
  return query(
    `SELECT label, address, city, pincode, phones, email, map_url AS mapUrl
       FROM branches
      ORDER BY display_order ASC`,
  );
}
