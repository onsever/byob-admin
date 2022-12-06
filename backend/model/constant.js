import mongoose from "mongoose";

const constantSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const constantModel = mongoose.model("constant", constantSchema);
export default constantModel;
