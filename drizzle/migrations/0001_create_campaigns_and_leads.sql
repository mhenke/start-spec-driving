BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  monthly_price INTEGER NOT NULL CHECK (monthly_price >= 0),
  downpayment INTEGER NOT NULL CHECK (downpayment >= 0),
  duration_months INTEGER NOT NULL CHECK (duration_months > 0),
  km_per_year INTEGER NOT NULL CHECK (km_per_year >= 0),
  campaign_type TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT 0,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  source_url TEXT,
  image TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_campaigns_verified ON campaigns (verified);
CREATE INDEX IF NOT EXISTS idx_campaigns_validity ON campaigns (valid_from, valid_to);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_campaign_id ON leads (campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

COMMIT;
