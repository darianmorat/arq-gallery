import { eq } from "drizzle-orm";
import { db } from "../db";
import { userTable } from "../db/schema";
import { genSalt, hash } from "bcrypt-ts";

export const userService = {
   findByEmail: async (email: string) => {
      const [user] = await db
         .select({
            id: userTable.id,
            password: userTable.password,
         })
         .from(userTable)
         .where(eq(userTable.email, email))
         .limit(1);

      return user;
   },

   findById: async (id: string) => {
      const [user] = await db
         .select({
            name: userTable.name,
            email: userTable.email,
            role: userTable.role,
            createdAt: userTable.createdAt,
         })
         .from(userTable)
         .where(eq(userTable.id, id))
         .limit(1);

      return user;
   },

   // Admin Operations
   getAll: async () => {
      const users = await db
         .select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
         })
         .from(userTable)
         .where(eq(userTable.role, "user"));
      return users;
   },

   create: async (name: string, email: string, password: string) => {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const [user] = await db
         .insert(userTable)
         .values({
            name,
            email,
            password: hashedPassword,
         })
         .returning({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
         });

      return user;
   },

   delete: async (id: string) => {
      const [user] = await db
         .delete(userTable)
         .where(eq(userTable.id, id))
         .returning({ name: userTable.name });

      return user;
   },
};
