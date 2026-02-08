CREATE TABLE `campaign` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`brand` text NOT NULL,
	`model` text NOT NULL,
	`monthly_price` integer NOT NULL,
	`downpayment` integer NOT NULL,
	`duration_months` integer NOT NULL,
	`km_per_year` integer NOT NULL,
	`campaign_type` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL,
	`valid_from` integer NOT NULL,
	`valid_to` integer NOT NULL,
	`image` text NOT NULL,
	`source_url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lead` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`campaign_id` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaign`(`id`) ON UPDATE no action ON DELETE cascade
);
