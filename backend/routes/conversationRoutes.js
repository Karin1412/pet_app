import express from "express";
import {
  createOrUpdateConversation,
  getConversation,
  getRecentChats,
} from "../controllers/conversationController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Gửi tin nhắn hoặc tạo mới cuộc trò chuyện
router.post("/send", protectRoute, createOrUpdateConversation);

// Lấy cuộc trò chuyện giữa hai người
router.get("/conversation/:receiverId", protectRoute, getConversation);

// Lấy danh sách các cuộc trò chuyện gần đây
router.get("/recent", protectRoute, getRecentChats);

export default router;
