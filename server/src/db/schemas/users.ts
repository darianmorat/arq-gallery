import { uuid, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";
import { posts } from "./posts";

export const users = pgTable("users", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   name: varchar({ length: 50 }).notNull(),
   username: varchar({ length: 30 }).notNull().unique(),
   email: varchar({ length: 255 }).notNull().unique(),
   password: varchar({ length: 60 }).notNull(),
   role: varchar({ length: 20 }).notNull().default("user"),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
   posts: many(posts),
}));
