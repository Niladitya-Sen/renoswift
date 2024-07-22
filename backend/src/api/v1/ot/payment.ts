import { Router } from "express";
import { OperationsTeamRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const payment = Router();

payment.get("/", (req: OperationsTeamRequest, res) => {
    const sql = `
        SELECT 
            o.orderId,
            o.quoteId,
            o.createdDate,
            o.status,
            (
                SELECT p.userId 
                FROM Payment AS p 
                WHERE o.quoteId = p.quoteId 
                LIMIT 1
            ) AS userId,
            (
                SELECT SUM(p.amountPaid) 
                FROM Payment AS p 
                WHERE o.quoteId = p.quoteId
            ) AS amountPaid,
            (
                SELECT SUM(p.amountDue) 
                FROM Payment AS p 
                WHERE o.quoteId = p.quoteId
            ) AS amountDue,
            (
                SELECT p.finalDueDate 
                FROM Payment AS p 
                WHERE p.quoteId = o.quoteId 
                ORDER BY p.createdDate DESC 
                LIMIT 1
            ) AS finalDueDate 
        FROM 
            Order_ AS o 
        ORDER BY 
            o.createdDate DESC;
    `;

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

payment.post("/update-payment", (req: OperationsTeamRequest, res) => {
    const {
         userId,
        quoteId,
        amountPaid,
        amountDue,
        method,
        finalDueDate,
        receipt
    } = req.body;
    console.log('Received finalDueDate:', finalDueDate);
    const sql = `INSERT INTO Payment 
                 (
                     userId,
                    quoteId, 
                    amountPaid, 
                    amountDue, 
                    method, 
                    finalDueDate, 
                    status, 
                    phase, 
                    isValid, 
                    isActive, 
                    isDeleted, 
                     
                    DBTimeStamp,
                    receipt
                 ) VALUES ( ?,?, ?, ?, ?, ?, 'done', 'order', 1, 1, 0,  NOW(), ?)`;

    const values = [
        userId,
        quoteId,
        amountPaid,
        amountDue,
        method,
        finalDueDate,
        receipt
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ message: "Payment added successfully" });
    });
});


export default payment;