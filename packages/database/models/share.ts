import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { usersTable } from "./user";
import { projectsTable } from "./project";

export const sharesTable = pgTable("shares", {
  id: uuid("id").defaultRandom().primaryKey(),

  creatorsId: uuid("creators_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  projectsId: uuid("projects_id")
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),

  shareToken: varchar("share_token", { length: 200 })
    .notNull()
    .unique(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});