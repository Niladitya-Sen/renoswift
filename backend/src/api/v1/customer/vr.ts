import { Router } from "express";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";

const vr = Router();

vr.get("/orders", (req: UserRequest, res) => {
    db.query('SELECT orderId FROM Order_ WHERE userId = ?', [req.userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(result.map((order: any) => order.orderId));
    });
});

vr.get("/:orderId", (req: UserRequest, res) => {
    const orderId = req.params.orderId;

    db.query('SELECT id, url, type FROM vr WHERE orderId = ? AND isActive = TRUE', [orderId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const result_ = {
            before: { ...result.filter((vr: any) => vr.type === 'before')[0] },
            during: { ...result.filter((vr: any) => vr.type === 'during')[0] },
            after: { ...result.filter((vr: any) => vr.type === 'after')[0] }
        }

        res.status(200).json(result_);
    });
});

export default vr;