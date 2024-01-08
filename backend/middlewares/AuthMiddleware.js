import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const AuthMiddlware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized :  Request is Invalid",
      });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedToken;

    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized: User not Found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export default AuthMiddlware;
