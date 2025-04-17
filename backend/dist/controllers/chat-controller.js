import User from "../models/User.js";
import { appCOnfigurations } from "../config/app.config.js";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: appCOnfigurations.GOOGLE_AI_SECRET });
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        // grab all the chats of user
        const chats = user.chats.map(({ role, parts }) => ({
            role: role,
            parts: parts.map((p) => ({ text: p.text })),
        }));
        // updating the user chats in the database
        user.chats.push({
            parts: [{ text: message }],
            role: "user",
        });
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
        });
        await user.save();
        res.status(201).json({
            success: true,
            data: response.text,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getAllChatsOfUser = async (req, res, next) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const clearConversation = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//# sourceMappingURL=chat-controller.js.map