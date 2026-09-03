import { query, queryOne } from "../config/db.js";
import { fetchCurrencyFreaksRates } from "../services/currencyFreaks.service.js";

/**
 * Returns buy/sell rates for one rate type ('currency' or 'travel_card'),
 * ordered the way they appear in the design.
 */

const COMMISSIONS = {
  currency: {
    USD: { buy: 1.6, sell: 1.6 },
    EUR: { buy: 2, sell: 2 },
    GBP: { buy: 2.2, sell: 2.2 },
    AUD: { buy: 2, sell: 2 },
    AED: { buy: 0.75, sell: 0.75 },
    CHF: { buy: 3, sell: 3 },
  },

  travel_card: {
    USD: { buy: 0.75, sell: 0.75 },
    EUR: { buy: 1.25, sell: 1.25 },
    GBP: { buy: 1.25, sell: 1.25 },
    AUD: { buy: 0.9, sell: 0.9 },
    AED: { buy: 0.5, sell: 0.5 },
    CHF: { buy: 1.5, sell: 1.5 },
  },
};

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
    "SELECT MAX(updated_at) AS updatedAt FROM exchange_rates WHERE rate_type = ?",
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
export async function refreshCurrencyRates() {
  const data = await fetchCurrencyFreaksRates();

  const usdToInr = Number(data?.rates?.INR);

  if (!Number.isFinite(usdToInr) || usdToInr <= 0) {
    throw new Error("Invalid USD to INR rate from CurrencyFreaks");
  }

  /*
   * Only update currencies that are actually configured
   * in the currencies table.
   */
  const currencies = await query(
    `SELECT id, code
       FROM currencies
      WHERE code IN (?, ?, ?, ?, ?, ?)`,
    ["USD", "EUR", "GBP", "AUD", "AED", "CHF"],
  );

  for (const currency of currencies) {
    const code = currency.code.toUpperCase();

    /*
     * CurrencyFreaks gives rates relative to USD.
     *
     * Example:
     *
     * USD -> INR = 88
     * USD -> EUR = 1.17
     *
     * EUR -> INR = 88 / 1.17
     */
    let marketRate;

    if (code === "INR") {
      marketRate = 1;
    } else {
      const currencyRate = Number(data.rates[code]);

      if (!Number.isFinite(currencyRate) || currencyRate <= 0) {
        console.warn(`No CurrencyFreaks rate found for ${code}`);

        continue;
      }

      marketRate = usdToInr / currencyRate;
    }

    marketRate = Number(marketRate.toFixed(4));

    /*
     * -----------------------------------------
     * CURRENCY
     * -----------------------------------------
     */
    const currencyCommission = COMMISSIONS.currency[code];

    if (currencyCommission) {
      const buyRate = Number((marketRate + currencyCommission.buy).toFixed(4));

      const sellRate = Number(
        (marketRate - currencyCommission.sell).toFixed(4),
      );

      await query(
        `INSERT INTO exchange_rates
           (
             currency_id,
             rate_type,
             buy_rate,
             sell_rate
           )
         VALUES (?, 'currency', ?, ?)
         ON DUPLICATE KEY UPDATE
           buy_rate = VALUES(buy_rate),
           sell_rate = VALUES(sell_rate),
           updated_at = CURRENT_TIMESTAMP`,
        [currency.id, buyRate, sellRate],
      );
    }

    /*
     * -----------------------------------------
     * TRAVEL CARD
     * -----------------------------------------
     *
     * IMPORTANT:
     * Travel card uses the SAME live CurrencyFreaks
     * market rate.
     *
     * Only the commission is different.
     */
    const travelCardCommission = COMMISSIONS.travel_card[code];

    if (travelCardCommission) {
      const buyRate = Number(
        (marketRate + travelCardCommission.buy).toFixed(4),
      );

      const sellRate = Number(
        (marketRate - travelCardCommission.sell).toFixed(4),
      );

      await query(
        `INSERT INTO exchange_rates
           (
             currency_id,
             rate_type,
             buy_rate,
             sell_rate
           )
         VALUES (?, 'travel_card', ?, ?)
         ON DUPLICATE KEY UPDATE
           buy_rate = VALUES(buy_rate),
           sell_rate = VALUES(sell_rate),
           updated_at = CURRENT_TIMESTAMP`,
        [currency.id, buyRate, sellRate],
      );
    }
  }

  return {
    success: true,
    source: "CurrencyFreaks",
    base: data.base ?? "USD",
  };
}
