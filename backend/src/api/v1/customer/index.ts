import { Router } from "express";
import { verfiyUser } from "../../../middleware/verifyUser";
import details from "./details";
import profile from "./profile";
import quotation from "./quotation";

const customer = Router();

customer.use(verfiyUser);
customer.use("/details", details);
customer.use("/quotation", quotation);
customer.use("/profile", profile);

export default customer;