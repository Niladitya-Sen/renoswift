import { Router } from "express";
import { param, query, validationResult } from "express-validator";
import { db } from "../../../../db/db";
import { AdminRequest } from "../../../types/types";

const quotation = Router();

quotation.get("/raised",
    query("limit").isNumeric().withMessage("Limit should be a number"),
    query("pageNo").isNumeric().withMessage("Page number should be a number"),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

        let limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        let pageNo = req.query.pageNo ? parseInt(req.query.pageNo as string) : 1;

        if (isNaN(limit) || isNaN(pageNo)) {
            return res.status(400).json({ message: "Invalid query parameters" });
        }

        const sql = 'SELECT quoteId, createdDate, name, email, contactNumber FROM Quote WHERE status = \'pending\' ORDER BY createdBy DESC LIMIT ? OFFSET ?';
        const values = [limit, (pageNo - 1) * limit];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.status(200).json(result);
        });
    }
);

quotation.get("/raised/:quoteId", (req: AdminRequest, res) => {
    const quoteId = req.params.quoteId;

    const sql = "SELECT q.quoteId, q.createdDate, q.name, q.email, q.contactNumber, q.propertyId, up.length, up.breadth, up.budget, up.issues, up.objective, up.style, up.timeline, up.specialRequest, q.address FROM Quote as q INNER JOIN UserProperty as up WHERE q.quoteId = ? AND q.propertyId = up.id";
    const values = [quoteId];

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
});

quotation.get("/send-quotation/:quoteId", param('quoteId').notEmpty(), (req: AdminRequest, res) => {
    const quoteId = req.params.quoteId;

    const sql = "SELECT q.quoteId, q.createdDate, q.name, q.email, q.contactNumber, q.propertyId, r.customerRemarks, r.teamRemarks, r.timeline, r.designPlan, r.quotation FROM Quote as q INNER JOIN QuoteReply as r WHERE q.quoteId = ? AND q.quoteId = r.quoteId"

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

quotation.get("/send-quotation",
    query("limit").isNumeric().withMessage("Limit should be a number"),
    query("pageNo").isNumeric().withMessage("Page number should be a number"),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

        const limitValue = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const pageNo = req.query.pageNo ? parseInt(req.query.pageNo as string) : 1;

        if (isNaN(limitValue) || isNaN(pageNo)) {
            return res.status(400).json({ message: "Invalid query parameters" });
        }

        const sql = 'SELECT quoteId, createdDate, name, email, contactNumber FROM Quote WHERE status = ? ORDER BY createdBy DESC LIMIT ? OFFSET ?';
        const values = ['sent', limitValue, (pageNo - 1) * limitValue];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.status(200).json(result);
        });
    }
);


export default quotation;