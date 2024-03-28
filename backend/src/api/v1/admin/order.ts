import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { db } from "../../../../db/db";
import { AdminRequest } from "../../../types/types";

const order = Router();

order.get("/", (req: AdminRequest, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const pageNo = req.query.pageNo ? parseInt(req.query.pageNo as string) : 1;

    const offset = (pageNo - 1) * limit;

    const sql = 'SELECT o.id, o.orderId, o.createdDate, o.status, (SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId) as totalAmount FROM Order_ as o ORDER BY o.createdDate DESC LIMIT ? OFFSET ?';

    db.query(sql, [limit, offset], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(result);
    });
});

order.get("/:orderId",
    body("orderId").notEmpty().withMessage("Order ID is required"),
    (req: AdminRequest, res) => {
        const orderId = req.params.orderId;

        const sql = 'SELECT o.orderId, o.createdDate, o.status, (SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId) as totalAmount FROM Order_ as o WHERE o.orderId = ?';

        db.query(sql, [orderId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Order not found" });
            }

            db.query('SELECT status, remarks, createdDate, imageURL FROM OrderStatus WHERE orderId = ? AND isCompleted = true ORDER BY createdDate DESC LIMIT 1', [orderId], (err, statusResult) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                res.status(200).json({ ...result[0], orderStatus: statusResult[0] });
            });
        });
    }
);

order.get("/track-status/:orderId",
    param("orderId").notEmpty().withMessage("Order ID is required"),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const orderId = req.params.orderId;

        const sql = 'SELECT id, status, date, isCompleted FROM OrderStatus WHERE orderId = ? ORDER BY date ASC';
        const values = [orderId];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.status(200).json(result);
        });
    }
);

export default order;