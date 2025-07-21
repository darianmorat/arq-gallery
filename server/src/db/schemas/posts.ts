import { uuid, timestamp, pgTable, text } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";
import { users } from "./users";
import { categories } from "./categories";

export const posts = pgTable("posts", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   publicId: text("public_id").notNull().unique(),
   mediaUrl: text("media_url").notNull(),
   resourceType: text("resource_type").notNull(),
   authorId: uuid("author_id")
      .notNull()
      .references(() => users.id),
   categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
   author: one(users, {
      fields: [posts.authorId],
      references: [users.id],
   }),
   category: one(categories, {
      fields: [posts.categoryId],
      references: [categories.id],
   }),
}));
