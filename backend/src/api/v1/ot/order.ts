import { Router } from "express";
import { OperationsTeamRequest } from "../../../types/types";
import { db } from "../../../../db/db";
import { body, param, validationResult } from "express-validator";
import multer from "multer";

const order = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images/')
    },
    filename: function (req: OperationsTeamRequest, file, cb) {
        cb(null, crypto.randomUUID() + file.mimetype.replace('image/', '.').split("+")[0]);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10MB
    },
});

order.get("/", (req: OperationsTeamRequest, res) => {
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

order.put("/generate",
    body("orderId").isNumeric(),
    (req: OperationsTeamRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const id = req.body.orderId;
        const orderId = "ORD" + id.toString().padStart(5, "0");

        db.beginTransaction((err) => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                res.status(500).json({ message: "Internal server error" });
                return;
            }

            const sql = 'UPDATE Order_ SET orderId = ?, status = \'confirmed\' WHERE id = ?';

            db.query(sql, [orderId, id], (err, result) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.log(err);
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(err);
                        res.status(500).json({ message: "Internal server error" });
                        return;
                    }

                    res.status(200).json({ message: "Order ID generated successfully" });
                });
            });
        });
    }
);

order.get("/:orderId",
    body("orderId").notEmpty().withMessage("Order ID is required"),
    (req: OperationsTeamRequest, res) => {
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
    (req: OperationsTeamRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const orderId = req.params.orderId;

        const sql = 'SELECT id, status, createdDate, isCompleted FROM OrderStatus WHERE orderId = ? ORDER BY createdDate ASC';
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

order.post("/update-status",
    upload.single("image"),
    body("orderId").notEmpty().withMessage("Order ID is required"),
    body("currentStatus").notEmpty().withMessage("Status is required"),
    body("remarks").notEmpty().withMessage("Remarks are required"),
    (req: OperationsTeamRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid input" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const { orderId, currentStatus, remarks } = req.body;

        db.beginTransaction((err) => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                res.status(500).json({ message: "Internal server error" });
                return;
            }

            const sql = 'INSERT INTO OrderStatus (orderId, status, remarks, imageURL, isCompleted) VALUES (?, ?, ?, ?, ?)';
            const values = [orderId, currentStatus, remarks, "/static/images/" + req.file?.filename, true];

            db.query(sql, values, (err, result) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.log(err);
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(err);
                        res.status(500).json({ message: "Internal server error" });
                        return;
                    }

                    res.status(200).json({ message: "Status updated successfully" });
                });
            });
        });
    }
);

export default order;