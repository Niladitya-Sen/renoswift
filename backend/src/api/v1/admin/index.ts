import { Router } from "express";
import adminAuth from "./auth";
import { verfiyAdmin } from "../../../middleware/verifyAdmin";
import users from "./users";
import quotation from "./quotation";
import profile from "./profile";
import suppliers from "./suppliers";
import products from "./products";
import order from "./order";
import payment from "./payment";

const admin = Router();

admin.use("/auth", adminAuth);

admin.use(verfiyAdmin);
admin.use("/profile", profile);
admin.use("/users", users);
admin.use("/quotation", quotation);
admin.use("/suppliers", suppliers);
admin.use("/products", products);
admin.use("/order", order);
admin.use("/payment", payment);

export default admin;