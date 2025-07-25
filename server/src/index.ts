import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import categoryRoute from "./routes/category.route";
import userRoute from "./routes/user.route";
import postRoute from "./routes/post.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   }),
);

app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`listening in port: ${PORT}`);
});
