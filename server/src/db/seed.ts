import { seedUsers } from "./seeds/users";

const main = async () => {
   console.log("Starting database seeding...");

   try {
      console.log("Seeding users...");
      await seedUsers();

      console.log("Seeding completed");
   } catch (error) {
      console.error("Error during seeding:", error);
      process.exit(1);
   }
};

main();
