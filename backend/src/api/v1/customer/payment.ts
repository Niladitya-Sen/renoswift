import { Router } from "express";
import { UserRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const payment = Router();

payment.get("/amount/:paymentId", (req: UserRequest, res) => {
    const paymentId = req.params.paymentId;
    const userId = req.userId;

    db.query('SELECT amount FROM Payment WHERE id = ? AND userId = ?', [paymentId, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }

        res.status(200).json(result[0]);
    });
});

payment.post("/initiate", (req: UserRequest, res) => {
    const { amount, quoteId, phase } = req.body;
    const userId = req.userId;

    db.beginTransaction((err) => {
        if (err) {
            console.error(err);

            db.rollback((err) => {
                if (err) {
                    console.error(err);
                }
                return res.status(500).json({ error: "Internal Server Error" });
            })
        }

        db.query('INSERT INTO Payment (userId, quoteId, amount, status, phase) VALUES (?, ?, ?, ?, ?)', [userId, quoteId, amount, 'initiated', phase], (err, result) => {
            if (err) {
                console.error(err);

                db.rollback((err) => {
                    if (err) {
                        console.error(err);
                    }
                    return res.status(500).json({ error: "Internal Server Error" });
                })
            }
            
            db.commit((err) => {
                if (err) {
                    db.rollback((err) => {
                        if (err) {
                            console.error(err);
                        }
                        return res.status(500).json({ error: "Internal Server Error" });
                    })
                }

                res.status(200).json({
                    message: "Payment initiated successfully!",
                    paymentId: result.insertId
                });
            });
        });
    })
});

payment.post("/confirm", (req: UserRequest, res) => {
    const { paymentId } = req.body;
    const userId = req.userId;

    db.beginTransaction((err) => {
        if (err) {
            db.rollback((err) => {
                if (err) {
                    console.error(err);
                }
                return res.status(500).json({ error: "Internal Server Error" });
            })
        }

        db.query('UPDATE Payment SET status = ? WHERE id = ? AND userId = ?', ['done', paymentId, userId], (err, result) => {
            if (err) {
                db.rollback((err) => {
                    if (err) {
                        console.error(err);
                    }
                    return res.status(500).json({ error: "Internal Server Error" });
                })
            }

            db.query('SELECT paymentId FROM Payment WHERE id = ?', [paymentId], (err, result) => {
                if (err) {
                    db.rollback((err) => {
                        if (err) {
                            console.error(err);
                        }
                        return res.status(500).json({ error: "Internal Server Error" });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback((err) => {
                            if (err) {
                                console.error(err);
                            }
                            return res.status(500).json({ error: "Internal Server Error" });
                        })
                    }

                    res.status(200).json({
                        message: "Payment confirmed successfully!",
                        paymentId: result[0].paymentId
                    });
                });
            });
        });
    });
});

export default payment;