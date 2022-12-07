import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    tableNo: { type: String, required: true },
    userId: { type: String, required: true },
    orderId: { type: String, required: false },
    checkedOut: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const tableModel = mongoose.model("table", TableSchema);
export default tableModel;
