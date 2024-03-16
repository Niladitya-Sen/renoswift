import { Router } from "express";
import { query, validationResult } from "express-validator";
import { db } from "../../../../db/db";
import { AdminRequest } from "../../../types/types";

const quotation = Router();

quotation.get("/raised",
    query("limit").isNumeric().withMessage("Limit should be a number"),
    query("pageNo").isNumeric().withMessage("Page number should be a number"),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

        let limit = parseInt(req.query.limit as string);
        let pageNo = parseInt(req.query.pageNo as string);

        if (limit < 1) {
            limit = 10;
        }

        if (pageNo < 1) {
            pageNo = 1;
        }

        const sql = 'SELECT quoteId, createdDate, name, email, contactNumber FROM Quote ORDER BY createdBy DESC LIMIT ? OFFSET ?';
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

export default quotation;