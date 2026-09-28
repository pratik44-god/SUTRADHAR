import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";

import { usersTable } from "./user";
import { teamsTable } from "./team";

export const projectStatusEnum = pgEnum("project_status_enum", [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export const projectsTable = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  creatorsId: uuid("creators_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  title: varchar("title", { length: 100 }).notNull(),

  description: varchar("description", {length: 300}),
  canvasData: text("canvas_data"),

  status: projectStatusEnum("status").notNull().default("DRAFT"),

  
  teamId: uuid("team_id")
    .references(() => teamsTable.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
