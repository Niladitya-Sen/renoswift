import { Router } from "express";
import { OperationsTeamRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const profile = Router();

profile.get("/", (req: OperationsTeamRequest, res) => {
    db.query('SELECT name FROM OperationsTeam WHERE id = ? AND isDeleted = FALSE;', [req.otId], (err, result) => {
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