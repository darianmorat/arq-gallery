ALTER TABLE "posts" ALTER COLUMN "title" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "description" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "title" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "tag" SET DATA TYPE varchar(100);