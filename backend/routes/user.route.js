import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import AuthMiddlware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/update-user", AuthMiddlware, updateUser);

export default router;
``;
