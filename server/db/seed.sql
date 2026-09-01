-- ---------------------------------------------------------------------------
-- Sample data taken from the approved designs.
-- Safe to re-run: every insert is an upsert.
--   mysql -u root -p < server/db/seed.sql
-- ---------------------------------------------------------------------------

USE hmax_forex;

-- Currencies -----------------------------------------------------------------
INSERT INTO currencies (code, name, flag_emoji, is_popular, display_order) VALUES
  ('AED', 'UAE Dirham',        '🇦🇪', TRUE,  1),
  ('AUD', 'Australian Dollar', '🇦🇺', TRUE,  2),
  ('CHF', 'Swiss Franc',       '🇨🇭', FALSE, 3),
  ('EUR', 'Euro',              '🇪🇺', TRUE,  4),
  ('GBP', 'Pound Sterling',    '🇬🇧', TRUE,  5),
  ('USD', 'US Dollar',         '🇺🇸', TRUE,  6),
  ('CAD', 'Canadian Dollar',   '🇨🇦', FALSE, 7),
  ('SGD', 'Singapore Dollar',  '🇸🇬', FALSE, 8),
  ('JPY', 'Japanese Yen',      '🇯🇵', FALSE, 9),
  ('THB', 'Thai Baht',         '🇹🇭', FALSE, 10)
ON DUPLICATE KEY UPDATE
  name          = VALUES(name),
  flag_emoji    = VALUES(flag_emoji),
  is_popular    = VALUES(is_popular),
  display_order = VALUES(display_order);

-- Counter rates --------------------------------------------------------------
INSERT INTO exchange_rates (currency_id, rate_type, buy_rate, sell_rate)
SELECT c.id, 'currency', r.buy_rate, r.sell_rate
FROM (
  SELECT 'AED' AS code, 26.4400 AS buy_rate, 24.9400 AS sell_rate UNION ALL
  SELECT 'AUD', 68.0700, 64.0700 UNION ALL
  SELECT 'CHF', 119.7600, 113.7600 UNION ALL
  SELECT 'EUR', 110.1500, 106.1500 UNION ALL
  SELECT 'GBP', 126.8000, 122.4000 UNION ALL
  SELECT 'USD', 95.9600, 92.7600 UNION ALL
  SELECT 'CAD', 70.1200, 66.4000 UNION ALL
  SELECT 'SGD', 71.8500, 68.1000 UNION ALL
  SELECT 'JPY', 0.6400, 0.5900 UNION ALL
  SELECT 'THB', 2.9500, 2.6000
) AS r
JOIN currencies c ON c.code = r.code
ON DUPLICATE KEY UPDATE
  buy_rate  = VALUES(buy_rate),
  sell_rate = VALUES(sell_rate);

-- Travel card rates ----------------------------------------------------------
INSERT INTO exchange_rates (currency_id, rate_type, buy_rate, sell_rate)
SELECT c.id, 'travel_card', r.buy_rate, r.sell_rate
FROM (
  SELECT 'AED' AS code, 26.4500 AS buy_rate, 24.9500 AS sell_rate UNION ALL
  SELECT 'AUD', 67.1100, 63.1100 UNION ALL
  SELECT 'CHF', 119.5400, 113.5400 UNION ALL
  SELECT 'EUR', 109.4600, 105.4600 UNION ALL
  SELECT 'GBP', 126.8100, 122.4100 UNION ALL
  SELECT 'USD', 95.9800, 92.7800
) AS r
JOIN currencies c ON c.code = r.code
ON DUPLICATE KEY UPDATE
  buy_rate  = VALUES(buy_rate),
  sell_rate = VALUES(sell_rate);

-- News -----------------------------------------------------------------------
INSERT INTO news_articles (slug, category, title, excerpt, body, image_url, is_featured, published_at) VALUES
  ('euro-two-month-high',
   'Market Update',
   'Euro Hits Two-Month High as ECB Signals Rate Cut Pause',
   'The euro climbed to its strongest level in two months after the European Central Bank indicated it would hold rates steady through the next quarter.',
   'The euro climbed to its strongest level in two months after the European Central Bank indicated it would hold rates steady through the next quarter. Travellers heading to Europe may want to lock in rates early.',
   NULL, TRUE, '2026-06-18'),
  ('rbi-tightens-lrs-rules',
   'Regulation News',
   'RBI Tightens Rules for Forex Transactions Under LRS',
   'Fresh reporting requirements apply to outward remittances made under the Liberalised Remittance Scheme. Here is what customers need to keep ready.',
   'Fresh reporting requirements apply to outward remittances made under the Liberalised Remittance Scheme. Customers should keep PAN, purpose codes and supporting documents ready before visiting a branch.',
   NULL, FALSE, '2026-06-12'),
  ('summer-travel-surge',
   'Travel Update',
   'Summer Travel Surge: Top Destinations & Forex Tips',
   'Bookings to Dubai, London and Singapore are up sharply this season. A short guide to carrying money on each route.',
   'Bookings to Dubai, London and Singapore are up sharply this season. Carry a mix of cash and a multi-currency card, and avoid airport counters where spreads are widest.',
   NULL, FALSE, '2026-06-05')
ON DUPLICATE KEY UPDATE
  title        = VALUES(title),
  excerpt      = VALUES(excerpt),
  body         = VALUES(body),
  category     = VALUES(category),
  is_featured  = VALUES(is_featured),
  published_at = VALUES(published_at);

-- FAQs -----------------------------------------------------------------------
-- These two tables are seeded wholesale, so clear them first.
DELETE FROM faqs;

INSERT INTO faqs (category, question, answer, display_order) VALUES
  ('general', 'How can I locate the nearest branch?',
   'We have two branches in Mumbai — Fort (280 Shahid Bhagat Singh Road) and Dombivli East (Guru Prasad Building, Manpada Road). Both are listed with directions on our Contact page.', 1),
  ('general', 'I have a concern about a transaction, who can I contact?',
   'Call 7710033233 or write to info@hmaxforex.com with your transaction reference. Our team responds on the same working day.', 2),
  ('general', 'What is a transaction fee?',
   'A transaction fee is a charge applied for processing an exchange. At HMAX the rate you are quoted is the rate you get, with no hidden markup added on top.', 3),
  ('general', 'What is an exchange rate?',
   'An exchange rate is the value of one currency expressed in another. Our rates show how many rupees one unit of a foreign currency costs to buy or sell.', 4),
  ('general', 'Where do I find the exchange rates?',
   'Live buy and sell rates for over 30 currencies are published on our home page and on the Currency Exchange page, and are refreshed through the day.', 5),
  ('remittance', 'How much money can I send abroad in a year?',
   'Under the RBI Liberalised Remittance Scheme, a resident individual may remit up to USD 250,000 per financial year for permitted purposes.', 1),
  ('remittance', 'What documents do I need for an outward remittance?',
   'A PAN card, a valid photo ID, and documents supporting the purpose of the transfer — for example an admission letter and fee invoice for education payments.', 2),
  ('remittance', 'How long does a transfer take?',
   'Most transfers reach the beneficiary bank within one to three working days, depending on the destination country and the correspondent bank.', 3),
  ('currency_exchange', 'What documents do I need to buy foreign currency?',
   'Your original passport, a valid visa, a confirmed flight ticket, and a PAN card wherever applicable.', 1),
  ('currency_exchange', 'What do I need to sell foreign currency?',
   'A government authorised photo ID and proof of residence are sufficient for selling unused currency back to us.', 2),
  ('currency_exchange', 'Do you deliver currency to my home?',
   'Yes. Doorstep delivery is available across Mumbai for orders placed in advance, subject to verification at the time of handover.', 3);

-- Branches -------------------------------------------------------------------
DELETE FROM branches;

INSERT INTO branches (label, address, city, pincode, phones, email, map_url, display_order) VALUES
  ('Head Office',
   'Shop no 1 & 2, 280 Shahid Bhagat Singh Road, Opp Lalit Restaurant, CST – Fort',
   'Mumbai', '400001', '7710033233,02222643355', 'info@hmaxforex.com',
   'https://maps.google.com/?q=280+Shahid+Bhagat+Singh+Road+Fort+Mumbai', 1),
  ('Branch Office',
   '1st Floor, Office No. 3, Guru Prasad Building, Near Chhatrapati Shivaji Maharaj Statue, Manpada Road, Dombivli East',
   'Mumbai', '421201', '9136926325,9321627630', 'hmaxdombivli@gmail.com',
   'https://maps.google.com/?q=Guru+Prasad+Building+Manpada+Road+Dombivli+East', 2);
