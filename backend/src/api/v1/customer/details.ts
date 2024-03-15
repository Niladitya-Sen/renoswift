import crypto from "crypto";
import { Router } from "express";
import multer from "multer";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";

const details = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.includes('video')) {
            cb(null, 'assets/videos/')
        } else {
            cb(null, 'assets/images/')
        }
    },
    filename: function (req, file, cb) {
        if (file.mimetype.includes('video')) {
            cb(null, crypto.randomUUID() + file.mimetype.replace('video/', '.'));
        } else {
            cb(null, crypto.randomUUID() + file.mimetype.replace('image/', '.').split("+")[0]);
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
});

details.post("/", upload.any(), (req: UserRequest, res) => {
    if (!req.files || !Array.isArray(req.files)) {
        res.status(400).json({ message: "No files uploaded" });
        return;
    }

    db.beginTransaction((err) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            throw err;
        }

        const {
            dimensions,
            budget,
            issues,
            specialRequest,
            timeline,
            style,
            objective
        } = req.body;

        let brands: string[] = [];

        for (const key in req.body) {
            if (key.startsWith('brand')) {
                brands.push(req.body[key]);
            }
        }

        const sql = 'INSERT INTO UserProperty (userId, type, length, breadth, budget, issues, specialRequest, timeline, style, objective, brands) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const values = [req.userId, 1, dimensions.split("X")[0], dimensions.split("X")[1], budget, issues, specialRequest, timeline, style, objective, brands.join(",")];

        db.query(sql, values, async (err, result) => {
            if (err) {
                db.rollback(() => {
                    res.status(500).json({ message: "Internal Server Error" });
                    throw err;
                });
            }

            if (req.files && Array.isArray(req.files)) {
                try {
                    for (const file of req.files) {
                        const sql_ = 'INSERT INTO UserPropertyAssets (userId, propertyId, propertyType, type, url) VALUES (?, ?, ?, ?, ?)';
                        const values = [req.userId, result.insertId, 1, file.mimetype.includes('video') ? 'video' : 'image', file.filename];
                        await new Promise((resolve, reject) => {
                            db.query(sql_, values, (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                resolve(result);
                            });
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            db.rollback(() => {
                                res.status(500).json({ message: "Internal Server Error" });
                                throw err;
                            });
                        }
                        res.status(200).json({ message: "Details added successfully", propertyId: result.insertId });
                    });
                } catch (err) {
                    console.log(err);
                    db.rollback(() => {
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }
            } else {
                db.rollback(() => {
                    res.status(400).json({ message: "No files uploaded" });
                });
            }
        });
    });
});

export default details;