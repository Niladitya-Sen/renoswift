import { Router } from "express";
import { db } from "../../../../db/db";
import { OperationsTeamRequest } from "../../../types/types";
import multer, { Multer } from "multer";

const vr = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/vr/');
    },
    filename: function (req, file, cb) {
        cb(null, crypto.randomUUID() + ".zip");
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100 // 100MB
    },
});

vr.get("/orders", (req: OperationsTeamRequest, res) => {
    db.query('SELECT orderId FROM Order_', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(result.map((order: any) => order.orderId));
    });
});

vr.get("/:orderId", (req: OperationsTeamRequest, res) => {
    const orderId = req.params.orderId;

    db.query('SELECT type, zipURL, url, isActive FROM vr WHERE orderId = ?', [orderId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const result_ = {
            before: result.find((r: any) => r.type === "before"),
            during: result.find((r: any) => r.type === "during"),
            after: result.find((r: any) => r.type === "after"),
        };

        res.status(200).json(result_);
    });
});

vr.post("/:orderId",
    upload.fields([{ name: 'before', maxCount: 1 }, { name: 'during', maxCount: 1 }, { name: 'after', maxCount: 1 }]),
    (req: OperationsTeamRequest, res) => {
        const orderId = req.params.orderId;

        if (!req.files) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const files = req.files as Record<string, Express.Multer.File[]>;

        if (Object.keys(files).length > 1) {
            return res.status(400).json({ message: "Please upload only one file at a time" });
        }

        if (!files.before && !files.during && !files.after) {
            return res.status(400).json({ message: "Please upload atleast one file" });
        }

        db.query('SELECT id FROM vr WHERE orderId = ? AND type = ?', [orderId, Object.keys(files)[0]], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length > 0) {
                db.query('UPDATE vr SET zipURL = ? WHERE orderId = ? AND type = ?', ["/static/vr/" + files[Object.keys(files)[0]][0].filename, orderId, Object.keys(files)[0]], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "Internal server error" });
                    }

                    res.status(200).json({ message: "File updated successfully" });
                });
            } else {
                db.query('INSERT INTO vr (orderId, type, zipURL) VALUES (?, ?, ?)', [orderId, Object.keys(files)[0], "/static/vr/" + files[Object.keys(files)[0]][0].filename], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "Internal server error" });
                    }

                    res.status(200).json({ message: "File uploaded successfully" });
                });
            }
        });
    }
);

vr.put("/approve/:orderId", (req: OperationsTeamRequest, res) => {
    const orderId = req.params.orderId;
    const type = req.body.type;

    db.query('UPDATE vr SET isActive = TRUE WHERE orderId = ? AND type = ?', [orderId, type], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({ message: "Link has been approved successfully" });
    });
});

export default vr;