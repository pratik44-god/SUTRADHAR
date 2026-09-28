import {
  pgTable,
  uuid,
  timestamp,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";

import { usersTable } from "./user";
import { teamsTable } from "./team";

export const teamMemberRoleEnum = pgEnum(
  "team_member_role_enum",
  [
    "ADMIN",
    "EDITOR",
    "VIEWER",
  ],
);

export const teamMembersTable = pgTable(
  "team_members",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    teamId: uuid("team_id")
      .notNull()
      .references(() => teamsTable.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    role: teamMemberRoleEnum("role")
      .notNull()
      .default("VIEWER"),

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
    teamUserUnique: unique(
      "team_member_team_user_unique",
    ).on(
      table.teamId,
      table.userId,
    ),
  }),
);

export type SelectTeamMember =
  typeof teamMembersTable.$inferSelect;

export type InsertTeamMember =
  typeof teamMembersTable.$inferInsert;