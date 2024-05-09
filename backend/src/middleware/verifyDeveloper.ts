import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/db";
import { DeveloperRequest } from "../types/types";

export const verfiyDeveloper = (req: DeveloperRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        db.query("SELECT * FROM Developer WHERE id = ? AND isDeleted = false", [decoded.devId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            req.devId = decoded.devId;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}