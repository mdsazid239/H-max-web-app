import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { rules, validateBody } from '../middleware/validate.js';
import { createQuote } from '../controllers/quotes.controller.js';

const router = Router();

const quoteSchema = {
  transactionType: rules.oneOf(['buy', 'sell']),
  productType: rules.oneOf(['currency', 'travel_card']),
  currencyCode: rules.text({ min: 3, max: 3 }),
  amount: rules.number({ min: 1, max: 100_000_000 }),
  mobile: rules.phone(),
  email: rules.email(),
};

router.post('/', validateBody(quoteSchema), asyncHandler(createQuote));

export default router;
