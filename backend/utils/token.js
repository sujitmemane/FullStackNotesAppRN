import jwt from "jsonwebtoken";

const createToken = (id) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export default createToken;
