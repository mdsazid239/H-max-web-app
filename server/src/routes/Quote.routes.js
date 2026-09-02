import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { verifyOtp } from './Otp.routes.js';

const router = Router();

// Blocks scripted spam submissions even if someone gets past the OTP step.
const quoteSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
});

router.post('/', quoteSubmitLimiter, async (req, res, next) => {
  try {
    const { mobile, otp, otpToken, transactionType, productType, currencyCode, amount, email } =
      req.body;

    verifyOtp({ mobile, otp, otpToken }); // throws ApiError on failure

    // ... existing quote-calculation / persistence / notification logic goes here ...

    res.json({
      message: 'Quote confirmed.',
      inrAmount: amount, // replace with the real calculated amount
      amount,
      currencyCode,
    });
  } catch (error) {
    next(error);
  }
});

export default router;