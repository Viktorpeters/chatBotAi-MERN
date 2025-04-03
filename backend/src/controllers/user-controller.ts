import { Request, Response, NextFunction } from "express";
import { signUpType, signInType } from "../schema/user-schema.js";
import User from "../models/User.js";
import { hash } from "bcrypt";

// GET-REQUEST -->
export const getAllUsers = async (req: Request, res: Response) => {
  // get all Users
  const users = await User.find({}).select("-password");

  res.status(200).json({
    sucess: true,
    data: users,
  });
};

// POST-REQUEST -->
export const signUp = async (
  req: Request<{}, {}, signUpType>,
  res: Response
) => {
  // get the user information from the request

  const { name, email, password } = req.body;
  // check if the user already exists

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // hash the password

    const hashedPassword = await hash(password, 10);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// POST-REQUEST -->
export const signIn = async (
  req: Request<{}, {}, signInType>,
  res: Response
) => {
  // get the user information from the request

  const { email, password } = req.body;

  // check if user exists

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // proceed to confirm if the password matches with the one stored.
    }
  } catch (error) {}
};
