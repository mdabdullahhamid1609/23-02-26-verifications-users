import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import { verifyMail } from "../emailVerify/verifyMail.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existing = await userSchema.findOne({ email });
    if (existing) {
      return res.status(401).json({
        success: false,
        message: "Email id already in use",
      });
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    console.log("password", hashedPassword);

    const user = await userSchema.create({
      userName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "5m",
    });
    verifyMail(token, email);
    user.token = token;
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log("tryyyyyyyy");

    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised access",
      });
    } else {
      console.log("tryyyyyyyy111");

      const passwordCheck = await bcrypt.compare(password, user.password);
      console.log(passwordCheck);
      if (!passwordCheck) {
        return res.status(402).json({
          success: false,
          message: "Incorrect Password",
        });
      } else if (passwordCheck && user.isVerified === true) {

        return res.status(200).json({
          success: true,
          message: "User Logged In Successfully",
          data: user,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Complete Email Verify then login..",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
