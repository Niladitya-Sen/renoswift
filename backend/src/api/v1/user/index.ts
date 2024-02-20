import { Router } from "express";
import auth from "./auth";

const user = Router();

user.use("/auth", auth);

export default user;