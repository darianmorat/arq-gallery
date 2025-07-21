import { uuid, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";
import { posts } from "./posts";

export const categories = pgTable("categories", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   title: varchar("title", { length: 50 }).notNull(),
   description: varchar("description", { length: 100 }).notNull(),
   tag: varchar("tag", { length: 30 }).notNull().unique(),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
   posts: many(posts),
}));
