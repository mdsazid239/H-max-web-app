import { ApiError } from "../utils/ApiError.js";
import { findRate } from "../models/rates.model.js";
import { createQuoteRequest } from "../models/quotes.model.js";

const ALLOWED_TRANSACTION_TYPES = ["buy", "sell"];
const ALLOWED_PRODUCT_TYPES = ["currency", "travel_card"];

export async function createQuote(req, res) {
  const { transactionType, productType, currencyCode, amount, mobile, email } =
    req.body;

  if (!ALLOWED_TRANSACTION_TYPES.includes(transactionType)) {
    throw ApiError.badRequest("transactionType must be either buy or sell");
  }

  if (!ALLOWED_PRODUCT_TYPES.includes(productType)) {
    throw ApiError.badRequest(
      "productType must be either currency or travel_card",
    );
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw ApiError.badRequest("amount must be greater than 0");
  }

  if (!currencyCode || typeof currencyCode !== "string") {
    throw ApiError.badRequest("currencyCode is required");
  }

  const code = currencyCode.trim().toUpperCase();

  /*
   * IMPORTANT:
   * Rate is always read from DB.
   * Never accept buyRate/sellRate from frontend.
   */
  const rate = await findRate(code, productType);

  if (!rate) {
    throw ApiError.badRequest(`We do not currently deal in ${code}`);
  }

  const rateApplied =
    transactionType === "buy" ? Number(rate.buyRate) : Number(rate.sellRate);

  if (!Number.isFinite(rateApplied) || rateApplied <= 0) {
    throw ApiError.badRequest(`No valid rate is available for ${code}`);
  }

  const inrAmount = Number((numericAmount * rateApplied).toFixed(2));

  const quoteId = await createQuoteRequest({
    transactionType,
    productType,
    currencyCode: code,
    amount: numericAmount,
    inrAmount,
    rateApplied,
    mobile,
    email,
  });

  res.status(201).json({
    quoteId,
    transactionType,
    productType,
    currencyCode: code,
    amount: numericAmount,
    rateApplied,
    inrAmount,
    message: "Quote saved. Our team will call you shortly to confirm.",
  });
}
