import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import mainRouter from "./route.js";
import userModel from "./model/user.js";

const user = new userModel();

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/api', mainRouter);

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
