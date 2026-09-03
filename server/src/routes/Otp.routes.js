import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { query, queryOne } from '../config/db.js';
const router = Router();
const OTP_SECRET = env.otpSecret;
function hashOtp(otp, salt) {
  return crypto.createHmac('sha256', OTP_SECRET).update(`${salt}:${otp}`).digest('hex');
}

// Prevents OTP-bombing a phone number / hammering the SMS gateway.
const otpSendLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many OTP requests. Please try again later.' },
});

router.post('/send', otpSendLimiter, async (req, res, next) => {
  try {
    const { mobile } = req.body;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      throw ApiError.badRequest('Enter a valid 10-digit mobile number.');
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000)); // 4 digits
    const salt = crypto.randomBytes(8).toString('hex');
    const otpHash = hashOtp(otp, salt);

    // expires_at is computed by MySQL's own NOW(), same clock as created_at —
    // this avoids any mismatch between the app server's and DB server's timezone.
    await query(
      `INSERT INTO otp_verifications (mobile, otp_hash, salt, expires_at, attempts)
       VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 MINUTE), 0)
       ON DUPLICATE KEY UPDATE
         otp_hash = VALUES(otp_hash),
         salt = VALUES(salt),
         expires_at = VALUES(expires_at),
         attempts = 0`,
      [mobile, otpHash, salt],
    );

    await sendSms(mobile, `Your verification code is ${otp}. Valid for 1 minute.`);

    const otpToken = jwt.sign({ mobile, salt }, OTP_SECRET, { expiresIn: '1m' });

    res.json({ otpToken });
  } catch (error) {
    next(error);
  }
});

export async function verifyOtp({ mobile, otp, otpToken }) {
  if (!mobile || !otp || !otpToken) {
    throw ApiError.badRequest('Missing verification details.');
  }

  let decoded;
  try {
    decoded = jwt.verify(otpToken, OTP_SECRET);
  } catch {
    throw ApiError.badRequest('OTP session expired. Please request a new OTP.');
  }

  if (decoded.mobile !== mobile) {
    throw ApiError.badRequest('Mobile number does not match the OTP request.');
  }

  // is_expired is computed by MySQL itself (expires_at < NOW()), same clock
  // that set expires_at in the first place — no client-side date comparison.
  const record = await queryOne(
    `SELECT *, (expires_at < NOW()) AS is_expired
     FROM otp_verifications WHERE mobile = ?`,
    [mobile],
  );

  if (!record || record.salt !== decoded.salt) {
    throw ApiError.badRequest('OTP session expired. Please request a new OTP.');
  }

  if (record.is_expired) {
    await query('DELETE FROM otp_verifications WHERE mobile = ?', [mobile]);
    throw ApiError.badRequest('OTP has expired. Please request a new one.');
  }

  if (record.attempts >= 5) {
    await query('DELETE FROM otp_verifications WHERE mobile = ?', [mobile]);
    throw ApiError.badRequest('Too many incorrect attempts. Please request a new OTP.');
  }

  if (hashOtp(otp, record.salt) !== record.otp_hash) {
    await query('UPDATE otp_verifications SET attempts = attempts + 1 WHERE mobile = ?', [mobile]);
    throw ApiError.badRequest('Incorrect OTP.');
  }

  await query('DELETE FROM otp_verifications WHERE mobile = ?', [mobile]); // one-time use
}

// Replace with your actual SMS provider (Twilio, MSG91, etc.)
async function sendSms(mobile, message) {
  console.log(`[DEV] SMS to ${mobile}: ${message}`);
}

export default router;