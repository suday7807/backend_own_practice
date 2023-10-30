import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const registor = async (req, res) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(404).json({ message: "User already exist" });
  const hashpassword = await bcrypt.hash(password, 9);
  user = User.create({ name, email, password: hashpassword });
  sendCookie(user, res, "registered successfully", 202);
};

export const login = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.json({ message: "Registor first" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid userId or email" });
  sendCookie(user, res, `welcome back ${user.name}`, 202);
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      message: "logout successfully",
    });
};

export const getMyProfile = async (req, res) => {
  
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
