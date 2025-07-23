import { db } from "../index";
import { users } from "../schema";

// REMEMBER:
// THIS SEED IS JUST USED FOR INFORMATION LIKE PRODUCTS, DECORATORS, ETC. NEVER FOR
// USERS AR ANYTHING THAT CAN HURT THE SECURITY OF THE APLICATION, THIS IS JUST TESTING

export const seedUsers = async () => {
   const userData = [
      {
         name: "Example name",
         username: "example01",
         email: "example@gmail.com",
         password: "password",
      },
   ];

   try {
      await db.insert(users).values(userData);
      console.log("Users seeded successfully");
   } catch (error) {
      console.error("Error seeding users:", error);
      throw error;
   }
};
