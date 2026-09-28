import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { usersTable } from "./user";

export const teamsTable = pgTable("teams", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  description: varchar("description", {
    length: 300,
  }),

  createdBy: uuid("created_by")
    .notNull()
    .references(() => usersTable.id, {
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
});

export type SelectTeam = typeof teamsTable.$inferSelect;
export type InsertTeam = typeof teamsTable.$inferInsert;