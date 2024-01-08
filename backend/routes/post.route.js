import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPost,
  getUserPosts,
  updatePost,
} from "../controllers/post.controller.js";
import AuthMiddlware from "../middlewares/AuthMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/create-post", AuthMiddlware, createPost);
router.get("/all-posts", getAllPosts);
router.get("/user-posts", AuthMiddlware, getUserPosts);
router.get("/get-post/:id", AuthMiddlware, getUserPost);
router.patch("/update-post/:id", AuthMiddlware, updatePost);
router.delete("/delete-post/:id", AuthMiddlware, deletePost);

export default router;
