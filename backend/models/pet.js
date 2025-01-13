import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    age: {
      type: Number, // Thêm trường age
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
