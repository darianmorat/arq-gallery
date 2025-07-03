import { db } from "../index";
import { userTable } from "../schema";

export const seedUsers = async () => {
   const userData = [
      {
         name: "John Doe",
         email: "john@example.com",
         password: "hashedPassword123",
         role: "admin",
      },
      {
         name: "Jane Smith",
         email: "jane@example.com",
         password: "hashedPassword456",
      },
      {
         name: "Bob Johnson",
         email: "bob@example.com",
         password: "hashedPassword789",
      },
   ];

   try {
      await db.insert(userTable).values(userData);
      console.log("Users seeded successfully");
   } catch (error) {
      console.error("Error seeding users:", error);
      throw error;
   }
};
