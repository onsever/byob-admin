import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    guranteedPrice: { type: String, required: true },
    category: { type: String, required },
  },
  {
    timestamps: true,
  }
);

const Drink = mongoose.model("drink", drinkSchema);
export default Drink;
