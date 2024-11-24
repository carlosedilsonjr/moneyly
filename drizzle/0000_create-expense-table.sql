CREATE TABLE `expense_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`date` integer NOT NULL,
	`category` text NOT NULL,
	`description` text,
	`value` integer NOT NULL,
	`paymentMethod` text NOT NULL
);
