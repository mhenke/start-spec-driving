CREATE TABLE `campaigns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`brand` text NOT NULL,
	`model` text NOT NULL,
	`monthly_price` integer NOT NULL,
	`downpayment` integer NOT NULL,
	`duration_months` integer NOT NULL,
	`km_per_year` integer NOT NULL,
	`campaign_type` text NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`valid_from` text NOT NULL,
	`valid_to` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`source_url` text,
	`image` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`campaign_id` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE cascade
);
