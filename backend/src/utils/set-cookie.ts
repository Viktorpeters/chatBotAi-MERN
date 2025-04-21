import { Response } from "express";
import { appCOnfigurations } from "../config/app.config.js";

export const setCookie = (res: Response, token: string) => {
  return res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: false,
    maxAge: +appCOnfigurations.COOKIE_EXP_TIME, //15minutes,
    sameSite: "lax",
  });
};

