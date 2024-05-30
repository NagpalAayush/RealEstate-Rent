import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { wrapAsync } from "../utils/wrapAsync.js";

export const signup = wrapAsync(async (req,res)=>{
    const {username , email , password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password , 10);
    const newUser = new User({username , email , password : hashedPassword})
    await newUser.save();
    res.json({
        Success : "User Signed Up Successfully"
    })
});