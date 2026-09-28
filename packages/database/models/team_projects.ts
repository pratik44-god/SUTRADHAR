import {
  index,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { projectsTable } from "./project";
import { teamsTable } from "./team";

export const teamProjectsTable = pgTable(
  "team_projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    teamId: uuid("team_id")
      .notNull()
      .references(() => teamsTable.id, {
        onDelete: "cascade",
      }),

    projectId: uuid("project_id")
      .notNull()
      .references(() => projectsTable.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    projectIdIdx: index("team_projects_project_id_idx").on(
      table.projectId,
    ),

    teamIdIdx: index("team_projects_team_id_idx").on(
      table.teamId,
    ),

    uniqueProject: unique("team_projects_project_id_unique").on(
      table.projectId,
    ),
  }),
);