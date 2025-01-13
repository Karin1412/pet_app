import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"; // Giữ nguyên middleware xác thực người dùng
import {
  getAllPets, // Lấy tất cả thú cưng
  getPetsByUser, // Lấy thú cưng theo người dùng
  addPet, // Thêm thú cưng mới
  deletePet, // Xóa thú cưng
  updatePet, // Cập nhật thú cưng nếu cần
} from "../controllers/petController.js"; // Cập nhật thêm controller cho updatePet

const router = express.Router();

// Lấy tất cả thú cưng (Chưa phân quyền)
router.get("/allPets", getAllPets);

// Lấy thú cưng của một người dùng theo username
router.get("/myPets", protectRoute, getPetsByUser);

// Thêm một thú cưng mới (Yêu cầu đăng nhập)
router.post("/", protectRoute, addPet);

// Cập nhật thông tin thú cưng (Yêu cầu đăng nhập)
router.put("/:petId", protectRoute, updatePet);

// Xóa một thú cưng (Yêu cầu đăng nhập)
router.delete("/:petId", protectRoute, deletePet);

export default router;
