import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/schemas/categories";

export const categoryService = {
   getByTag: async (tag: string) => {
      const [categoryTag] = await db
         .select({
            id: categories.id,
            tag: categories.tag,
         })
         .from(categories)
         .where(eq(categories.tag, tag))
         .limit(1);

      return categoryTag;
   },

   // admin actions
   getAll: async () => {
      const users = await db.select().from(categories);
      return users;
   },

   create: async (title: string, tag: string, description: string) => {
      const [category] = await db
         .insert(categories)
         .values({
            title,
            tag,
            description,
         })
         .returning({
            id: categories.id,
            title: categories.title,
            tag: categories.tag,
            description: categories.description,
         });

      return category;
   },

   delete: async (id: string) => {
      const [category] = await db
         .delete(categories)
         .where(eq(categories.id, id))
         .returning({ tag: categories.tag });

      return category;
   },
};
