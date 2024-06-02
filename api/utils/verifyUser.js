import jwt from "jsonwebtoken";
import ExpressError from "./ExpressError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.Access_token;

  if (!token) {
    const err = new ExpressError(401, "Unauthorized Access");
    return next(err);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new ExpressError(403, "Forbidden"));
    }
    console.log(user);
    req.user = user;
    next();
  });
};
