import { Router } from "express";
import auth from "./auth";
import { verfiyOperationsTeam } from "../../../middleware/verifyOperationsTeam";
import quotation from "./quotation";

const ot = Router();

ot.use("/auth", auth);

ot.use(verfiyOperationsTeam);

ot.use("/quotation", quotation);

export default ot;