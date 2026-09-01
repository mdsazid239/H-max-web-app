import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCurrencies, getRates } from '../controllers/rates.controller.js';

const router = Router();

router.get('/', asyncHandler(getRates));
router.get('/currencies', asyncHandler(getCurrencies));

export default router;
