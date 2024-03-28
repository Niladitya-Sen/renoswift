import { Router } from "express";
import { db } from "../../../../db/db";
import { query, param, validationResult, body } from "express-validator";
import { OperationsTeamRequest } from "../../../types/types";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/pdf/')
    },
    filename: function (req: OperationsTeamRequest, file, cb) {
        cb(null, crypto.randomUUID() + file.mimetype.replace('application/', '.').split("+")[0]);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10MB
    },
});

const quotation = Router();

quotation.get("/send-quotation/:quoteId", param('quoteId').notEmpty(), (req: OperationsTeamRequest, res) => {
    const quoteId = req.params.quoteId;

    const sql = "SELECT q.quoteId, q.createdDate, q.name, q.email, q.contactNumber, q.propertyId, r.customerRemarks, r.teamRemarks, r.timeline, r.designPlan, r.quotation, r.amount FROM Quote as q INNER JOIN QuoteReply as r WHERE q.quoteId = ? AND q.quoteId = r.quoteId"

    db.query(sql, [quoteId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Quotation Reply not found" });
        }

        res.status(200).json(result[0]);
    });
});

quotation.get("/:type",
    param("type").isIn(["pending", "raised", "send-quotation"]),
    query("limit").isNumeric().withMessage("Limit should be a number"),
    query("pageNo").isNumeric().withMessage("Page number should be a number"),
    (req: OperationsTeamRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

        let limit = parseInt(req.query.limit as string);
        let pageNo = parseInt(req.query.pageNo as string);

        let type = "pending";

        if (req.params.type === "send-quotation") {
            type = "sent";
        }

        if (limit < 1) {
            limit = 10;
        }

        if (pageNo < 1) {
            pageNo = 1;
        }

        const sql = 'SELECT quoteId, createdDate, name, email, contactNumber FROM Quote WHERE status = ? ORDER BY createdBy DESC LIMIT ? OFFSET ?';
        const values = [type, limit, (pageNo - 1) * limit];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.status(200).json(result);
        });
    }
);

quotation.get("/:type/:quoteId",
    param("type").isIn(["pending", "raised", "send-quotation"]),
    (req: OperationsTeamRequest, res) => {
        const quoteId = req.params.quoteId;

        let type = "pending";

        let sql = "SELECT q.quoteId, q.createdDate, q.name, q.email, q.contactNumber, q.propertyId, up.length, up.breadth, up.budget, up.issues, up.objective, up.style, up.timeline, up.specialRequest, q.address FROM Quote as q INNER JOIN UserProperty as up WHERE q.quoteId = ? AND q.propertyId = up.id AND q.status = ?";

        if (req.params.type === "send-quotation") {
            type = "sent";
        }

        if (req.params.type === "pending") {
            sql = "SELECT q.quoteId, q.createdDate, q.name, q.email, q.contactNumber, q.propertyId FROM Quote as q WHERE q.quoteId = ? AND q.status = ?"
        }

        let values = [quoteId, type];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Quote not found" });
            }

            db.query('SELECT id, type, url FROM UserPropertyAssets WHERE propertyId = ?', [result[0].propertyId], (err, assets) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                res.status(200).json({
                    ...result[0],
                    assets
                });
            });
        });
    }
);

quotation.post("/reply/:quoteId",
    upload.any(),
    param("quoteId").notEmpty().withMessage("Quote ID is required"),
    body("customerRemarks").isString().isLength({ min: 0, max: 255 }),
    body("teamRemarks").isString().isLength({ min: 0, max: 255 }),
    body("timeline").isString().isLength({ min: 0, max: 255 }),
    body("amount").isNumeric().withMessage("Amount should be a number"),
    (req: OperationsTeamRequest, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

        const quoteId = req.params.quoteId;
        const { customerRemarks, teamRemarks, timeline, amount } = req.body;

        let filePaths: {
            designPlan: string;
            quotation: string;
        } = {
            designPlan: "",
            quotation: ""
        };

        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            req.files.forEach(file => {
                if (file.fieldname === "designPlan") {
                    filePaths.designPlan = "/static/pdf/" + file.filename;
                } else if (file.fieldname === "quotation") {
                    filePaths.quotation = "/static/pdf/" + file.filename;
                }
            });
        } else {
            res.status(400).json({ message: "File is required" });
            return;
        }

        const sql = 'INSERT INTO QuoteReply (quoteId, customerRemarks, teamRemarks, timeline, designPlan, quotation, amount) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [quoteId, customerRemarks, teamRemarks, timeline, filePaths.designPlan, filePaths.quotation, amount];

        db.beginTransaction((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
                return;
            }

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error(err);   
                    db.rollback((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }

                db.query('UPDATE Quote SET status = ? WHERE quoteId = ?', ["sent", quoteId], (err, result) => {
                    if (err) {
                        console.error(err);                        
                        db.rollback((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(500).json({ message: "Internal server error" });
                        return;
                    }

                    db.commit((err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: "Internal server error" });
                            return;
                        }

                        res.status(200).json({ message: "Quotation sent successfully" });
                    });
                });
            });
        });
    }
);

export default quotation;