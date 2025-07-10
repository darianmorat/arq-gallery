import { eq } from "drizzle-orm";
import { db } from "../db";
import { userTable } from "../db/schema";

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
            id: userTable.id,
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
};
