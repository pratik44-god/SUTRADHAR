CREATE TABLE "shares" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creators_id" uuid NOT NULL,
	"projects_id" uuid NOT NULL,
	"share_token" varchar(200) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shares_share_token_unique" UNIQUE("share_token")
);
--> statement-breakpoint
ALTER TABLE "shares" ADD CONSTRAINT "shares_creators_id_users_id_fk" FOREIGN KEY ("creators_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shares" ADD CONSTRAINT "shares_projects_id_projects_id_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;