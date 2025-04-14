import { Router } from "express";
import { generateChatCompletion } from "../controllers/chat-controller.js";
import { protectedRoute } from "../middleware/protected.js";

const chatRoutes = Router();

chatRoutes.post("/sendchat", protectedRoute, generateChatCompletion);

export default chatRoutes;