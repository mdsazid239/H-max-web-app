import { ApiError } from '../utils/ApiError.js';
import { isProduction } from '../config/env.js';

/** Catches requests that matched no route. */
export function notFoundHandler(req, res) {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
}

/**
 * Single place where errors become responses. Express recognises this as
 * error middleware because it takes four arguments.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  const status = error instanceof ApiError ? error.status : 500;

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({
    error: status >= 500 && isProduction ? 'Something went wrong' : error.message,
    ...(error.details ? { details: error.details } : {}),
  });
}
