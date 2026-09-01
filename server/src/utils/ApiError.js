/**
 * An error with an HTTP status attached. Anything thrown that is not an
 * ApiError is treated as a 500 by the error middleware.
 */
export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }

  static badRequest(message, details) {
    return new ApiError(400, message, details);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }
}
