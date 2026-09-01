import { ApiError } from '../utils/ApiError.js';
import {
  findAllCurrencies,
  findLastUpdatedAt,
  findRatesByType,
} from '../models/rates.model.js';

const ALLOWED_RATE_TYPES = ['currency', 'travel_card'];

/**
 * GET /api/rates?type=currency
 * Powers the "Live Exchange Rates" table and its two tabs.
 */
export async function getRates(req, res) {
  const rateType = req.query.type ?? 'currency';

  if (!ALLOWED_RATE_TYPES.includes(rateType)) {
    throw ApiError.badRequest(`type must be one of: ${ALLOWED_RATE_TYPES.join(', ')}`);
  }

  const [rates, updatedAt] = await Promise.all([
    findRatesByType(rateType),
    findLastUpdatedAt(rateType),
  ]);

  res.json({ rateType, updatedAt, rates });
}

/** GET /api/rates/currencies — options for the quote form dropdown. */
export async function getCurrencies(req, res) {
  res.json({ currencies: await findAllCurrencies() });
}
