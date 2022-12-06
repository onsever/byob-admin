import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    order: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", OrderSchema);
export default orderModel;
