import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    order: { type: Array, required: true },
    drinkOrder: { type: Array, required: true },
    isComplete: { type: Boolean, required: true },
    totalPaid: { type: String, required: false },
    paymentMethod: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", OrderSchema);
export default orderModel;
