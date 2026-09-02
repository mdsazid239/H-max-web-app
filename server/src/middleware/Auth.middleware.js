// auth.middleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // separate secret from OTP_SECRET

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Login required.' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET); // e.g. { id, mobile, iat, exp }
    next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
}

module.exports = { requireAuth };