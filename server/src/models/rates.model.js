import { query, queryOne } from '../config/db.js';

/**
 * Returns buy/sell rates for one rate type ('currency' or 'travel_card'),
 * ordered the way they appear in the design.
 */
export function findRatesByType(rateType) {
  return query(
    `SELECT c.code,
            c.name,
            c.flag_emoji  AS flagEmoji,
            c.is_popular  AS isPopular,
            r.buy_rate    AS buyRate,
            r.sell_rate   AS sellRate,
            r.updated_at  AS updatedAt
       FROM exchange_rates r
       JOIN currencies c ON c.id = r.currency_id
      WHERE r.rate_type = ?
      ORDER BY c.display_order ASC`,
    [rateType],
  );
}

/** Timestamp of the most recently edited rate, shown as "Last updated ...". */
export async function findLastUpdatedAt(rateType) {
  const row = await queryOne(
    'SELECT MAX(updated_at) AS updatedAt FROM exchange_rates WHERE rate_type = ?',
    [rateType],
  );
  return row?.updatedAt ?? null;
}

/** Single rate used by the quote calculator. */
export function findRate(currencyCode, rateType) {
  return queryOne(
    `SELECT c.code,
            c.name,
            r.buy_rate   AS buyRate,
            r.sell_rate  AS sellRate
       FROM exchange_rates r
       JOIN currencies c ON c.id = r.currency_id
      WHERE c.code = ? AND r.rate_type = ?`,
    [currencyCode, rateType],
  );
}

/** Every currency HMAX deals in, for the dropdown in the quote form. */
export function findAllCurrencies() {
  return query(
    `SELECT code, name, flag_emoji AS flagEmoji, is_popular AS isPopular
       FROM currencies
      ORDER BY display_order ASC`,
  );
}
