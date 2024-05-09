import { Router } from "express";
import { db } from "../../../../db/db";
import { DeveloperRequest } from "../../../types/types";

const projects = Router();

function validateURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

projects.get("/", (req: DeveloperRequest, res) => {
    db.query('SELECT orderId FROM Order_', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(result.map((order: any) => order.orderId));
    });
});

projects.get("/:orderId", (req: DeveloperRequest, res) => {
    const orderId = req.params.orderId;

    db.query('SELECT type, zipURL, url FROM vr WHERE orderId = ?', [orderId], (err, result) => {
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

projects.post("/vr/:orderId", (req: DeveloperRequest, res) => {
    const orderId = req.params.orderId;

    const { before, during, after, type } = req.body;

    if (!before && !during && !after) {
        return res.status(400).json({ message: "No data provided" });
    }

    if (before && after && during) {
        return res.status(400).json({ message: "Invalid data provided" });
    }

    if (!validateURL(before) && !validateURL(during) && !validateURL(after)) {
        return res.status(400).json({ message: "Invalid URL provided" });
    }

    db.query('UPDATE vr SET url = ? WHERE orderId = ? AND type = ?', [req.body[type], orderId, type], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({ message: "URL updated" });
    });
});


export default projects;