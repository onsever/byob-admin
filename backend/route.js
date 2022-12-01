import express from "express";
import authController from './controller/authController.js'

const route = express.Router();

route.use('/auth', authController);


export default route;