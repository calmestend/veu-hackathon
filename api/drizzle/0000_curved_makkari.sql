CREATE TABLE `centers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`latitude` real NOT NULL,
	`longitud` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dates` (
	`id` integer PRIMARY KEY NOT NULL,
	`start_time` real NOT NULL,
	`end_time` real NOT NULL,
	`driver_id` integer NOT NULL,
	`vehicle_id` integer NOT NULL,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `driver_reports` (
	`id` integer PRIMARY KEY NOT NULL,
	`client_id` integer NOT NULL,
	`commmentary` text NOT NULL,
	`rating` integer NOT NULL,
	`emotion_status` text NOT NULL,
	FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `travels` (
	`id` integer PRIMARY KEY NOT NULL,
	`price` real NOT NULL,
	`client_id` integer NOT NULL,
	FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` integer PRIMARY KEY NOT NULL,
	`registration` text NOT NULL,
	`mileage` real NOT NULL,
	`brand` text NOT NULL,
	`color` text NOT NULL,
	`last_service` text NOT NULL,
	`center_id` integer NOT NULL,
	FOREIGN KEY (`center_id`) REFERENCES `centers`(`id`) ON UPDATE no action ON DELETE cascade
);
