

CREATE DATABASE IF NOT EXISTS hmax_forex
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hmax_forex;

-- ---------------------------------------------------------------------------
-- Currencies that HMAX deals in. `code` is the ISO 4217 code (USD, EUR, ...).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS currencies (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code          CHAR(3)      NOT NULL,
  name          VARCHAR(80)  NOT NULL,      -- "US Dollar"
  flag_emoji    VARCHAR(16)  NULL,          -- shown next to the code in the rates table
  is_popular    BOOLEAN      NOT NULL DEFAULT FALSE,
  display_order SMALLINT     NOT NULL DEFAULT 0,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_currencies_code (code)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- Buy / sell rates. One row per currency per rate type, updated by staff.
-- `rate_type` separates cash counter rates from travel card rates, which is
-- exactly the split shown by the two tabs on the site.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exchange_rates (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  currency_id INT UNSIGNED   NOT NULL,
  rate_type   ENUM('currency', 'travel_card') NOT NULL DEFAULT 'currency',
  buy_rate    DECIMAL(10, 4) NOT NULL,      -- INR the customer pays to buy 1 unit
  sell_rate   DECIMAL(10, 4) NOT NULL,      -- INR the customer receives when selling 1 unit
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_rates_currency_type (currency_id, rate_type),
  CONSTRAINT fk_rates_currency FOREIGN KEY (currency_id)
    REFERENCES currencies (id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- Leads from the "Get Quote" calculator on the home and currency pages.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transaction_type ENUM('buy', 'sell')            NOT NULL,
  product_type    ENUM('currency', 'travel_card') NOT NULL DEFAULT 'currency',
  currency_code   CHAR(3)        NOT NULL,
  amount          DECIMAL(14, 2) NOT NULL,        -- amount in foreign currency
  inr_amount      DECIMAL(14, 2) NOT NULL,        -- quoted INR equivalent
  rate_applied    DECIMAL(10, 4) NOT NULL,        -- rate at the moment of the quote
  mobile          VARCHAR(20)    NOT NULL,
  email           VARCHAR(160)   NOT NULL,
  status          ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_quotes_created_at (created_at)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- Submissions from the contact form.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(160) NOT NULL,
  phone      VARCHAR(20)  NOT NULL,
  message    TEXT         NOT NULL,
  is_read    BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_contact_created_at (created_at)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- News & insights cards.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS news_articles (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(160) NOT NULL,
  category     VARCHAR(60)  NOT NULL,        -- "Market Update", "Regulation News", ...
  title        VARCHAR(200) NOT NULL,
  excerpt      VARCHAR(500) NULL,
  body         TEXT         NULL,
  image_url    VARCHAR(300) NULL,
  is_featured  BOOLEAN      NOT NULL DEFAULT FALSE,
  published_at DATE         NOT NULL,
  UNIQUE KEY uq_news_slug (slug),
  KEY idx_news_published_at (published_at)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- FAQ entries, grouped by the three tabs on the FAQ page.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category      ENUM('general', 'remittance', 'currency_exchange') NOT NULL,
  question      VARCHAR(255) NOT NULL,
  answer        TEXT         NOT NULL,
  display_order SMALLINT     NOT NULL DEFAULT 0,
  KEY idx_faqs_category (category, display_order)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- Branch addresses used on the contact page and in the footer.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS branches (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  label         VARCHAR(80)  NOT NULL,        -- "Head Office" / "Branch Office"
  address       VARCHAR(300) NOT NULL,
  city          VARCHAR(80)  NOT NULL,
  pincode       VARCHAR(10)  NOT NULL,
  phones        VARCHAR(120) NOT NULL,        -- comma separated
  email         VARCHAR(160) NOT NULL,
  map_url       VARCHAR(400) NULL,
  display_order SMALLINT     NOT NULL DEFAULT 0
) ENGINE = InnoDB;
