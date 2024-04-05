import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/db";
import { OperationsTeamRequest } from "../types/types";

export const verfiyOperationsTeam = (req: OperationsTeamRequest, res: Response, next: NextFunction) => {
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

        db.query("SELECT * FROM OperationsTeam WHERE id = ? AND isDeleted = false", [decoded.otId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            req.otId = decoded.otId;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}