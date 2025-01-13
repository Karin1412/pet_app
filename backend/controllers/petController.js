import Pet from "../models/Pet.js"; // Import mô hình Pet
import User from "../models/user.model.js"; // Import mô hình User nếu cần
import { v2 as cloudinary } from "cloudinary";


// Lấy tất cả thú cưng
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find(); // Lấy tất cả thú cưng từ DB
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getPetsByUser = async (req, res) => {
  try {
    // Sử dụng thông tin người dùng từ token, không phải từ URL
    const user = req.user; // Đã có từ middleware `protectRoute`

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const pets = await Pet.find({ owner: user._id }); // Lấy thú cưng của người dùng này
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


export const addPet = async (req, res) => {
  try {
    const { name, species, age } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    // Kiểm tra các trường bắt buộc
    if (!name || !species || !age) {
      return res
        .status(400)
        .json({ error: "Pet must have a name, species, and age" });
    }

    let imgUrl = img; // Nếu không có ảnh thì imgUrl sẽ là null

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      imgUrl = uploadedResponse.secure_url; // Lấy URL của ảnh đã được upload
    }

    // Tạo mới thú cưng và lưu vào DB
    const newPet = new Pet({
      name,
      species,
      age, // Lưu trường age vào DB
      owner: userId,
      img: imgUrl,
    });

    await newPet.save(); // Lưu thú cưng vào cơ sở dữ liệu

    res.status(201).json(newPet); // Trả về đối tượng thú cưng vừa tạo
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Xóa thú cưng
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId); // Tìm thú cưng qua ID
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    if (pet.owner.toString() !== req.user.id) {
      // Kiểm tra xem người dùng có phải là chủ của thú cưng không
      return res.status(401).json({ msg: "Not authorized" });
    }

    await pet.remove(); // Xóa thú cưng khỏi DB
    res.json({ msg: "Pet removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Cập nhật thông tin thú cưng (nếu cần)
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId); // Tìm thú cưng qua ID
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    if (pet.owner.toString() !== req.user.id) {
      // Kiểm tra quyền sở hữu
      return res.status(401).json({ msg: "Not authorized" });
    }

    pet.name = req.body.name || pet.name; // Cập nhật tên thú cưng (nếu có)
    pet.type = req.body.type || pet.type; // Cập nhật loại thú cưng (nếu có)
    pet.img = req.body.img || pet.img; // Cập nhật ảnh (nếu có)

    await pet.save(); // Lưu lại sự thay đổi
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
