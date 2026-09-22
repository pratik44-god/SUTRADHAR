CREATE TYPE "public"."project_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creators_id" uuid NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(300),
	"status" "project_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_creators_id_users_id_fk" FOREIGN KEY ("creators_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;