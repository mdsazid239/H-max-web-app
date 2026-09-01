import { ApiError } from '../utils/ApiError.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{8,20}$/;

/**
 * Small set of field rules. Each rule receives the raw value and returns
 * either a cleaned value or throws a message describing what is wrong.
 */
export const rules = {
  text: ({ min = 1, max = 255 } = {}) => (value) => {
    const cleaned = String(value ?? '').trim();

    if (cleaned.length < min) throw new Error(`must be at least ${min} characters`);
    if (cleaned.length > max) throw new Error(`must be at most ${max} characters`);
    return cleaned;
  },

  email: () => (value) => {
    const cleaned = String(value ?? '').trim().toLowerCase();

    if (!EMAIL_PATTERN.test(cleaned)) throw new Error('must be a valid email address');
    return cleaned;
  },

  phone: () => (value) => {
    const cleaned = String(value ?? '').trim();

    if (!PHONE_PATTERN.test(cleaned)) throw new Error('must be a valid phone number');
    return cleaned;
  },

  number: ({ min = 0, max = Number.MAX_SAFE_INTEGER } = {}) => (value) => {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) throw new Error('must be a number');
    if (parsed < min) throw new Error(`must be at least ${min}`);
    if (parsed > max) throw new Error(`must be at most ${max}`);
    return parsed;
  },

  oneOf: (allowed) => (value) => {
    const cleaned = String(value ?? '').trim();

    if (!allowed.includes(cleaned)) throw new Error(`must be one of: ${allowed.join(', ')}`);
    return cleaned;
  },
};

/**
 * Builds middleware that validates req.body against a schema of rules and
 * replaces req.body with the cleaned values.
 *
 *   validateBody({ email: rules.email(), name: rules.text({ max: 120 }) })
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const cleaned = {};
    const errors = {};

    for (const [field, rule] of Object.entries(schema)) {
      try {
        cleaned[field] = rule(req.body?.[field]);
      } catch (error) {
        errors[field] = error.message;
      }
    }

    if (Object.keys(errors).length > 0) {
      return next(ApiError.badRequest('Please check the highlighted fields', errors));
    }

    req.body = cleaned;
    return next();
  };
}
