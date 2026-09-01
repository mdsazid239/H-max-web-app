import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getFaqs, getNews } from '../controllers/content.controller.js';

const newsRouter = Router();
newsRouter.get('/', asyncHandler(getNews));

const faqRouter = Router();
faqRouter.get('/', asyncHandler(getFaqs));

export { newsRouter, faqRouter };
