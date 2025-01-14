import Conversation from "../models/conversation.js";
import User from "../models/user.model.js";

// Tạo hoặc cập nhật cuộc trò chuyện
const createOrUpdateConversation = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user._id;

  try {
    // Kiểm tra xem cuộc trò chuyện giữa senderId và receiverId đã tồn tại chưa
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Nếu không có cuộc trò chuyện thì tạo mới
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [{ sender: senderId, content }],
      });
      await conversation.save();
    } else {
      // Nếu đã có thì thêm tin nhắn mới vào
      conversation.messages.push({ sender: senderId, content });
      await conversation.save();
    }

    res
      .status(200)
      .json({ message: "Message sent successfully", conversation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating/updating conversation", error });
  }
};

// Lấy cuộc trò chuyện giữa sender và receiver
const getConversation = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.user._id; // Lấy senderId từ req.user (người dùng đã đăng nhập)

  try {
    // Tìm cuộc trò chuyện giữa sender và receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
      .populate("messages.sender", "username profileImg") // Lấy thông tin người gửi tin nhắn
      .populate("participants", "username profileImg"); // Lấy thông tin người tham gia cuộc trò chuyện

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Trả về cuộc trò chuyện với các tin nhắn đã được populate
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching conversation", error });
  }
};

export { createOrUpdateConversation, getConversation };
