import { Router } from "express";
import { OperationsTeamRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const payment = Router();

payment.get("/", (req: OperationsTeamRequest, res) => {
    const sql = 'SELECT o.orderId, o.createdDate, o.status, (SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId) as amountPaid, (SELECT SUM(p.amountDue) FROM Payment as p WHERE o.quoteId = p.quoteId) as amountDue, (SELECT p.finalDueDate FROM Payment as p WHERE p.quoteId = o.quoteId ORDER BY p.createdDate DESC LIMIT 1) as finalDueDate FROM Order_ as o ORDER BY o.createdDate DESC; ';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(result);
    });
});

payment.get("/:orderId", (req: OperationsTeamRequest, res) => {
    const sql = 'SELECT o.orderId, o.createdDate, o.status, (SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId) as amountPaid, (SELECT SUM(p.amountDue) FROM Payment as p WHERE o.quoteId = p.quoteId) as amountDue, (SELECT p.finalDueDate FROM Payment as p WHERE p.quoteId = o.quoteId ORDER BY p.createdDate DESC LIMIT 1) as finalDueDate FROM Order_ as o WHERE o.orderId = ? ORDER BY o.createdDate DESC;';

    db.query(sql, [req.params.orderId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        db.query('SELECT p.phase, p.amountPaid as amount, p.finalDueDate as dueDate, p.status FROM Payment p INNER JOIN Order_ o WHERE o.orderId = ? AND o.quoteId = p.quoteId', [req.params.orderId], (err, payments) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            res.status(200).json({ ...result[0], payments });
        });
    });
});

export default payment;