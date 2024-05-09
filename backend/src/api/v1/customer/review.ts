import { Router } from "express";
import { UserRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const review = Router();

review.post("/", (req: UserRequest, res) => {
    db.query("INSERT INTO Review (rating, feedback, customerId, orderId) VALUES (?, ?, ?, ?)", [req.body.rating, req.body.comment, req.userId, req.body.orderId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(201).json({ message: "Review added successfully" });
    });
});

review.get("/:orderId", (req: UserRequest, res) => {
    db.query("SELECT rating, feedback FROM Review WHERE customerId = ? AND orderId = ?", [req.userId, req.params.orderId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result[0]);
    });
});

export default review;