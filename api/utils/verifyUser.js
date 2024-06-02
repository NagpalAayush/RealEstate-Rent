import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.Access_token;

  if (!token) {
    const err = new Error(401, "Unauthorized Access");
    return next(err);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error(403, "Forbidden"));
    }
    console.log(user);
    req.user = user;
    next();
  });
};
