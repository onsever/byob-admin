import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    tableNo: { type: String, required: true },
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const tableModel = mongoose.model("table", TableSchema);
export default tableModel;
