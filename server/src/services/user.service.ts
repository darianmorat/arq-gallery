import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { genSalt, hash } from "bcrypt-ts";

export const userService = {
   findByEmail: async (email: string) => {
      const [user] = await db
         .select({
            id: users.id,
            password: users.password,
         })
         .from(users)
         .where(eq(users.email, email))
         .limit(1);

      return user;
   },

   findByUsername: async (username: string) => {
      const [user] = await db
         .select({
            id: users.id,
            password: users.password,
         })
         .from(users)
         .where(eq(users.username, username))
         .limit(1);

      return user;
   },

   findById: async (id: string) => {
      const [user] = await db
         .select({
            name: users.name,
            username: users.username,
            email: users.email,
            role: users.role,
            createdAt: users.createdAt,
         })
         .from(users)
         .where(eq(users.id, id))
         .limit(1);

      return user;
   },

   // admin operations
   getAll: async () => {
      const allUsers = await db.query.users.findMany({
         where: eq(users.role, "user"),
         with: {
            posts: true,
         },
      });
      return allUsers;
   },

   create: async (
      name: string,
      username: string,
      phone: string,
      email: string,
      password: string,
   ) => {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const [newUser] = await db
         .insert(users)
         .values({
            name,
            username,
            phone,
            email,
            password: hashedPassword,
         })
         .returning({
            id: users.id,
            name: users.name,
            email: users.email,
         });

      return { ...newUser, posts: [] };
   },

   delete: async (id: string) => {
      const [user] = await db
         .delete(users)
         .where(eq(users.id, id))
         .returning({ name: users.name });

      return user;
   },

   // public operations
   getUser: async (username: string) => {
      const [user] = await db.select().from(users).where(eq(users.username, username));

      return user;
   },
};
