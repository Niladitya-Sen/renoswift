import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/db";
import { AdminRequest } from "../types/types";

export const verfiyAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    db.query("SELECT * FROM User as u INNER JOIN UserRole as ur WHERE u.id = ? AND u.role = ur.id", [decoded.adminId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0 || result[0].role !== "Admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.adminId = decoded.adminId;
        next();
    });
}