import { query } from '../config/db.js';

/** News cards, newest first. The featured one renders as the wide card. */
export function findNewsArticles() {
  return query(
    `SELECT slug, category, title, excerpt, body,
            image_url    AS imageUrl,
            is_featured  AS isFeatured,
            published_at AS publishedAt
       FROM news_articles
      ORDER BY is_featured DESC, published_at DESC`,
  );
}

/**
 * FAQ entries. Passing a category returns only that tab's questions;
 * passing nothing returns all of them.
 */
export function findFaqs(category = null) {
  if (category) {
    return query(
      `SELECT category, question, answer
         FROM faqs
        WHERE category = ?
        ORDER BY display_order ASC`,
      [category],
    );
  }

  return query(
    `SELECT category, question, answer
       FROM faqs
      ORDER BY category ASC, display_order ASC`,
  );
}
