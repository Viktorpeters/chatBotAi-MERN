import { Request, Response, NextFunction } from "express";
import { signUpType, signInType } from "../schema/user-schema.js";
import User from "../models/User.js";

// GET-REQUEST -->
export const getAllUsers = async (req: Request, res: Response) => {
  // get all Users

  
};

// POST-REQUEST -->
export const signUp = async (
  req: Request<{}, {}, signUpType>,
  res: Response
) => {};

// POST-REQUEST -->
export const signIn = async (
  req: Request<{}, {}, signInType>,
  res: Response
) => {};
