import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({
    message: "This is the test Controller",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new Error("Access Forbidden"));
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        username: req.body.username,
      },
    },
    { new: true }
  );
const {password , ...rest} = updatedUser._doc;
res.status(200).json(rest)

};
