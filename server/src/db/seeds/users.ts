import { db } from "../index";
import { userTable } from "../schema";

// REMEMBER: USING THIS SEED JUST FOR INFORMATION LIKE PRODUCTS, ETC NEVER FOR
// USERS AR ANYTHING THAT CAN HURT THE SECURITY OF THE APLICATION

export const seedUsers = async () => {
   const userData = [
      {
         name: "John Doe",
         email: "john@example.com",
         password: "$2b$10$2PmDkuLmez5JEK9rZmUAdujF6MW3n6/xbJijKW4l4LwquwxQJrvlG", // admin123
         role: "admin",
      },
      {
         name: "Jane Smith",
         email: "jane@example.com",
         password: "$2b$10$OBXey0PsP5rSNxZlaQAmuOwKKoYckp9RAQ5L3fBb9zAOd235t4a3W", // 1082124119
      },
      {
         name: "Bob Johnson",
         email: "bob@example.com",
         password: "$2b$10$r6UmwTOBUmwxpJo8u5cWeuoNYtiR2o5d4GfKKjNkjtPSyUoorIqUu", // 1082124119
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
