import jwt from "jsonwebtoken";

export const jwtGenerator = (userId: string) => {
   const payload = {
      userId: userId,
   };

   return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "60m" });
};
