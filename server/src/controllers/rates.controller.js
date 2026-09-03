import { ApiError } from "../utils/ApiError.js";

import {
  findAllCurrencies,
  findLastUpdatedAt,
  findRatesByType,
  refreshCurrencyRates,
} from "../models/rates.model.js";

const ALLOWED_RATE_TYPES = ["currency", "travel_card"];

export async function getRates(req, res) {
  const rateType = req.query.type ?? "currency";

  if (!ALLOWED_RATE_TYPES.includes(rateType)) {
    throw ApiError.badRequest(
      `type must be one of: ${ALLOWED_RATE_TYPES.join(", ")}`,
    );
  }

  /*
   * Refresh both currency and travel-card rates
   * from the same CurrencyFreaks market data.
   *
   * The commissions are different for each type.
   */
  if (rateType === "currency" || rateType === "travel_card") {
    await refreshCurrencyRates();
  }
  const [rates, updatedAt] = await Promise.all([
    findRatesByType(rateType),
    findLastUpdatedAt(rateType),
  ]);

  res.json({
    rateType,
    updatedAt,
    rates,
  });
}

export async function getCurrencies(req, res) {
  res.json({
    currencies: await findAllCurrencies(),
  });
}
