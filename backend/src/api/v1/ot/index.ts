import { Router } from "express";
import auth from "./auth";
import { verfiyOperationsTeam } from "../../../middleware/verifyOperationsTeam";
import quotation from "./quotation";
import order from "./order";
import profile from "./profile";
import payment from "./payment";

const ot = Router();

ot.use("/auth", auth);

ot.use(verfiyOperationsTeam);

ot.use("/profile", profile);
ot.use("/quotation", quotation);
ot.use("/order", order);
ot.use("/payment", payment);

export default ot;