import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { wrapAsync } from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";

export const signup = wrapAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.json({
    Success: "User Signed Up Successfully",
  });
  if (err) return next(new ExpressError());
});

export const signin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email: email });
  if (!validUser) return next(new ExpressError(404, "Please check your email"));
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) return next(new ExpressError(401, "Incorrect Password"));
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = validUser._doc;
  res.cookie("Access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      maxAge: 3 * 24 * 60 * 60 * 1000,
    }).status(200).json(rest);
});
