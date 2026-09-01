import { Router } from 'express';
import ratesRoutes from './rates.routes.js';
import quotesRoutes from './quotes.routes.js';
import contactRoutes from './contact.routes.js';
import { faqRouter, newsRouter } from './content.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.use('/rates', ratesRoutes);
router.use('/quotes', quotesRoutes);
router.use('/contact', contactRoutes);
router.use('/news', newsRouter);
router.use('/faqs', faqRouter);

export default router;
