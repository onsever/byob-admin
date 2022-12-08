import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    image: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("food", FoodSchema);
export default Food;
