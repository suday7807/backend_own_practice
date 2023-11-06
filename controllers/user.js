import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandlier from "../middlewares/error.js";

export const registor = async (req, res,next) => {
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandlier("user already exist", 404));

    const hashpassword = await bcrypt.hash(password, 9);
    user = User.create({ name, email, password: hashpassword });
    sendCookie(user, res, "registered successfully", 202);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandlier("Registor first", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandlier("Invalid userId or email", 404));
    sendCookie(user, res, `welcome back ${user.name}`, 202);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      message: "logout successfully",
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
