import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();
dotenv.config();
const port = 3000;

// Middlewares

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.get("/", (req, res) => {
  console.log("Sujit");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
