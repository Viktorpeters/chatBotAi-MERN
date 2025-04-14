import { NextFunction, Request, Response } from "express";
import User, { IChatSchema } from "../models/User.js";
import { appCOnfigurations } from "../config/app.config.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: appCOnfigurations.GOOGLE_AI_SECRET });

type GeminiMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    console.log(user);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // grab all the chats of user
    const chats: GeminiMessage[] = user.chats.map(({ role, parts }) => ({
      role: role as "user" | "model",
      parts: parts.map((p: { text: string }) => ({ text: p.text })),
    }));

    // updating the user chats in the database
    user.chats.push({
      parts: [{ text: message }],
      role: "user",
    } as IChatSchema);

    // now get the feedback of the assistant ai
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [],
    });

    const response = await chat.sendMessage({
      message: message,
    });

    // when feedback is gotten from the AI ,feed it back into the database

    user.chats.push({
      parts: [{ text: response.text }],
      role: "model",
    } as IChatSchema);

    await user.save();

    res.status(201).json({
      success: true,
      data: response.text,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllChatsOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user;

  // find the user with the userId

  try {
    const user = await User.findById(userId);

    if (user) {
      return res.status(201).json({
        success: true,
        data: user.chats,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearConversation = async (req: Request, res: Response) => {
  const { userId } = req.user;

  // find the user with the userId

  try {
    const user = await User.findById(userId);

    if (user) {
      user.chats = [];

      await user.save();

      res.status(200).json({
        success: true,
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};