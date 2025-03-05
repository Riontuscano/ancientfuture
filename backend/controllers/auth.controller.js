import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from 'express-validator';
import generateTokenandSetcookie from "../utils/Generatejwt.js";

export const signUp  = async (req, res) => {
    try{const { fullname, username, password, confirmPassword, gender } = req.body;
    if(confirmPassword != password) return res.status(418).json({"message":"Password Doesn't match!!"})
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: "Username already taken" });

    const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender == 'Male' ? boyPic : girlPic
    })
    generateTokenandSetcookie(newUser._id, res);
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
    }catch(error){
        console.log("Error in signup user",error);
        res.status(500).json({ error : "Internal Server Error" });
    }
}

export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ error: "Invalid username or password"})
      bcrypt.compare(password, user?.password || "", (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password or username" });
        }else{
            res.status(200).json( user );
        }
      });
      
      generateTokenandSetcookie(user._id, res);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  };

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({success:true, message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ Error: error.message });
            }
            };
