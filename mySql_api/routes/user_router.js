import express from "express";
import userController from "../controller/user_controller.js"

const userRouter = express.Router();
userRouter.post("/",userController.addUser);

export default userRouter