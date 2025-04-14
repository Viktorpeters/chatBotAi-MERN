import mongoose, { Document } from "mongoose";
import { randomUUID } from "crypto";
import { Part } from "@google/generative-ai";
import { string } from "zod";

export interface IChatSchema extends Document {
  role: string;
  parts: Parts[];
}

interface Parts {
  text: string;
}

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  chats: IChatSchema[];
}

const chatSchema = new mongoose.Schema<IChatSchema>({
  role: {
    type: String,
    required: true,
    enum: ["user", "model"],
  },
  parts: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const userSchema = new mongoose.Schema<IUserSchema>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: {
    type: [chatSchema],
    default: [],
  },
});

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;
