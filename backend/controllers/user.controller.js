import User from "../models/user.model.js";
import bcrypt, { hashSync } from "bcrypt";
import createToken from "../utils/token.js";
import router from "../routes/user.route.js";
import AuthMiddlware from "../middlewares/AuthMiddleware.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already is registered",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    user = await User.create({ name, email, password: hashedPassword });
    const token = createToken(user?._id);
    res.status(200).json({
      success: true,
      message: "User Registered Successfull!",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered!",
      });
    }

    const isMatch = bcrypt.compareSync(password, user?.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password is wrong" });
    }

    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "Login Successfull!",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password Field Should Not Be Empty!",
      });
    }
    const _id = req?.user?._id;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    let hashedPassword;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = hashSync(password, salt);
    }
    const userUpdated = await User.findByIdAndUpdate(
      _id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User Information Updated Successfully!",
      user: userUpdated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
