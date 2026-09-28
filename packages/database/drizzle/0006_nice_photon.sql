CREATE TABLE "team_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "team_projects_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
ALTER TABLE "team_projects" ADD CONSTRAINT "team_projects_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_projects" ADD CONSTRAINT "team_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "team_projects_project_id_idx" ON "team_projects" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "team_projects_team_id_idx" ON "team_projects" USING btree ("team_id");