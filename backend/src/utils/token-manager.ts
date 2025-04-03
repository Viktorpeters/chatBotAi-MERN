import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { token } from "morgan";
import { appCOnfigurations } from "../config/app.config.js";

type TPayload = {
  userId: mongoose.Schema.Types.ObjectId;
};

type tokenType = "ACCESS" | "REFRESH";

export const generateToken = (tokenType: tokenType, payload: TPayload) => {
  if (tokenType === "ACCESS") {
    return jwt.sign(payload, appCOnfigurations.JWT_SECRET, {
      expiresIn: +appCOnfigurations.ACCESS_EXPIRY_TIME,
    });
  }

  return jwt.sign(payload, appCOnfigurations.JWT_SECRET, {
    expiresIn: +appCOnfigurations.REFRESH_EXPIRY_TIME,
  });
};
