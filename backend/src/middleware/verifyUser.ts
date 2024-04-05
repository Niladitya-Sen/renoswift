import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/db";

export const verfiyUser = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
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

        db.query("SELECT * FROM User WHERE id = ?", [decoded.userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.userId = decoded.userId;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}