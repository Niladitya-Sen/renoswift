import { Router } from "express";
import { DeveloperRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const profile = Router();

profile.get("/", (req: DeveloperRequest, res) => {
    db.query('SELECT name FROM Developer WHERE id = ? AND isDeleted = FALSE;', [req.devId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            ...result[0],
        });
    });
});

export default profile;