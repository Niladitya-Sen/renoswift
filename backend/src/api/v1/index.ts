import { Router } from "express";
import auth from "./auth/auth";
import customer from "./customer";
import ot from "./ot";
import admin from "./admin";
import staticRouter from "./static/static";
import verify from "./verify";
import dev from "./dev";

const v1 = Router();

v1.use("/static", staticRouter);

v1.use('/verify', verify);

v1.use('/auth', auth);
v1.use('/customer', customer);
v1.use('/ot', ot);
v1.use('/admin', admin);
v1.use('/dev', dev);

export default v1;