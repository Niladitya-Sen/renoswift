import { Router } from "express";
import { verfiyUser } from "../../../middleware/verifyUser";
import details from "./details";
import profile from "./profile";
import quotation from "./quotation";
import payment from "./payment";
import order from "./order";
import vr from "./vr";
import review from "./review";
import subscriptionEmail from "./emailsubscriptions";

const customer = Router();

customer.use("/subscriptionemail", subscriptionEmail)
customer.use(verfiyUser);
customer.use("/details", details);
customer.use("/quotation", quotation);
customer.use("/profile", profile);
customer.use("/payment", payment);
customer.use("/order", order);
customer.use("/vr", vr);
customer.use("/review", review);

export default customer;