import { ApiError } from '../utils/ApiError.js';
import { findFaqs, findNewsArticles } from '../models/content.model.js';

const FAQ_CATEGORIES = ['general', 'remittance', 'currency_exchange'];

/** GET /api/news — cards for the News & Insights page. */
export async function getNews(req, res) {
  res.json({ articles: await findNewsArticles() });
}

/** GET /api/faqs?category=general */
export async function getFaqs(req, res) {
  const { category } = req.query;

  if (category && !FAQ_CATEGORIES.includes(category)) {
    throw ApiError.badRequest(`category must be one of: ${FAQ_CATEGORIES.join(', ')}`);
  }

  res.json({ faqs: await findFaqs(category ?? null) });
}
