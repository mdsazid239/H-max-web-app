import { ApiError } from '../utils/ApiError.js';
import { findRate } from '../models/rates.model.js';
import { createQuoteRequest } from '../models/quotes.model.js';

/**
 * POST /api/quotes
 * Prices the request against the current rate, saves the lead, and returns
 * the quote so the form can confirm it on screen.
 *
 * The rate is always re-read from the database — never trusted from the
 * browser — so a customer cannot submit a stale or edited rate.
 */
export async function createQuote(req, res) {
  const { transactionType, productType, currencyCode, amount, mobile, email } = req.body;

  const rate = await findRate(currencyCode, productType);

  if (!rate) {
    throw ApiError.badRequest(`We do not currently deal in ${currencyCode}`);
  }

  const rateApplied = transactionType === 'buy' ? rate.buyRate : rate.sellRate;
  const inrAmount = Number((amount * rateApplied).toFixed(2));

  const quoteId = await createQuoteRequest({
    transactionType,
    productType,
    currencyCode,
    amount,
    inrAmount,
    rateApplied,
    mobile,
    email,
  });

  res.status(201).json({
    quoteId,
    currencyCode,
    amount,
    rateApplied,
    inrAmount,
    message: 'Quote saved. Our team will call you shortly to confirm.',
  });
}
