import { Router } from "express";
import auth from "./auth";
import { verfiyDeveloper } from "../../../middleware/verifyDeveloper";
import profile from "./profile";
import projects from "./projects";


const dev = Router();

dev.use('/auth', auth);

dev.use(verfiyDeveloper);

dev.use("/profile", profile);
dev.use("/projects", projects);

export default dev;