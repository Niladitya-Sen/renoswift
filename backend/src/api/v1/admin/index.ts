import { Router } from "express";
import adminAuth from "./auth";
import { verfiyAdmin } from "../../../middleware/verifyAdmin";
import users from "./users";
import quotation from "./quotation";

const admin = Router();

admin.use("/auth", adminAuth);

admin.use(verfiyAdmin);
admin.use("/users", users);
admin.use("/quotation", quotation);

export default admin;