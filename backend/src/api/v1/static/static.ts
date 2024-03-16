import { Router } from "express";
import { db } from "../../../../db/db";

const staticRouter = Router();

staticRouter.get("/pdf/:file", (req, res) => {
    res.sendFile(`/assets/pdf/${req.params.file}`, { root: "." });
});

staticRouter.get("/profile/image/:file", (req, res) => {
    /* const userId = req.query.userId;
    db.query('SELECT imageURL FROM User WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!result[0].imageURL) {
            return res.sendFile('/assets/account/defaultUser.png', { root: "." });
        }

        return res.sendFile(result[0].imageURL, { root: "." });
    }); */
    res.sendFile(`/assets/account/${req.params.file}`, { root: "." }, (err) => {
        if (err) {
            res.sendFile('/assets/account/defaultUser.png', { root: "." });
        }
    });
});

staticRouter.get("/:type/:file", (req, res) => {
    res.sendFile(`/assets/${req.params.type}/${req.params.file}`, { root: "." });
});


export default staticRouter;