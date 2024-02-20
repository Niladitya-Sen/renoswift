import { Router } from "express";
import user from "./user";

const v1 = Router();

v1.use('/user', user);

export default v1;