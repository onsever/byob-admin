import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    guranteedPrice: { type: String, required: true },
    currentPrice: { type: String, required: false },
    category: { type: String, required: true },
    isHighest: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const Drink = mongoose.model("drink", drinkSchema);
export default Drink;
