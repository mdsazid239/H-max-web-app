import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { rules, validateBody } from '../middleware/validate.js';
import { createMessage, getBranches } from '../controllers/contact.controller.js';

const router = Router();

const contactSchema = {
  name: rules.text({ min: 2, max: 120 }),
  email: rules.email(),
  phone: rules.phone(),
  message: rules.text({ min: 10, max: 2000 }),
};

router.get('/branches', asyncHandler(getBranches));
router.post('/', validateBody(contactSchema), asyncHandler(createMessage));

export default router;
