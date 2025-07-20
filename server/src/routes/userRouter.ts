import express from "express";
import { GetAllUsers } from "../controllers/UserController.js";

const UserRouter=express.Router()


UserRouter.get("/",GetAllUsers)

export default UserRouter