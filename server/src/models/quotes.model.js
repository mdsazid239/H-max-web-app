import { query } from '../config/db.js';

/** Stores a quote request from the rate calculator and returns its id. */
export async function createQuoteRequest(quote) {
  const result = await query(
    `INSERT INTO quote_requests
       (transaction_type, product_type, currency_code, amount,
        inr_amount, rate_applied, mobile, email)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      quote.transactionType,
      quote.productType,
      quote.currencyCode,
      quote.amount,
      quote.inrAmount,
      quote.rateApplied,
      quote.mobile,
      quote.email,
    ],
  );
  return result.insertId;
}
