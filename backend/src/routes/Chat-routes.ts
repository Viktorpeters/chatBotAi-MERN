import { Router } from "express";
import {
  clearConversation,
  generateChatCompletion,
  getAllChatsOfUser,
} from "../controllers/chat-controller.js";
import { protectedRoute } from "../middleware/protected.js";

const chatRoutes = Router();

chatRoutes.post("/sendchat", protectedRoute, generateChatCompletion);
chatRoutes.get("/all-chats", protectedRoute, getAllChatsOfUser);
chatRoutes.get("/clear-chats", protectedRoute, clearConversation);

export default chatRoutes;