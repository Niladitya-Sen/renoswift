import { Router } from "express";
import adminAuth from "./auth";
import { verfiyAdmin } from "../../../middleware/verifyAdmin";
import users from "./users";

const admin = Router();

admin.use("/auth", adminAuth);

admin.use(verfiyAdmin);
admin.use("/users", users);

export default admin;