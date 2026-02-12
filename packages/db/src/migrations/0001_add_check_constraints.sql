-- Migration number: 0001
-- Adds CHECK constraints for positive integers on numeric fields in campaigns table

-- Drop and recreate the campaigns table with CHECK constraints
CREATE TABLE campaigns_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    monthly_price INTEGER NOT NULL CHECK (monthly_price > 0),
    downpayment INTEGER NOT NULL CHECK (downpayment > 0),
    duration_months INTEGER NOT NULL CHECK (duration_months > 0),
    km_per_year INTEGER NOT NULL CHECK (km_per_year > 0),
    campaign_type TEXT NOT NULL CHECK (campaign_type IN ('Privat', 'Næring')),
    verified INTEGER NOT NULL DEFAULT 0 CHECK (verified IN (0, 1)),
    valid_from TEXT NOT NULL,
    valid_to TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    source_url TEXT,
    image TEXT NOT NULL,
    CHECK (valid_from <= valid_to)
);

-- Copy data from old table to new table
INSERT INTO campaigns_new SELECT * FROM campaigns;

-- Drop old table and rename new table
DROP TABLE campaigns;
ALTER TABLE campaigns_new RENAME TO campaigns;

-- Create the leads table with foreign key constraint
CREATE TABLE leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);