import { Router } from "express";
import { db } from "../../../../db/db";

const staticRouter = Router();

staticRouter.get("/pdf/:file", (req, res) => {
  res.sendFile(`/assets/pdf/${req.params.file}`, { root: "." });
});

staticRouter.get("/profile/image/:file", (req, res) => {
  res.sendFile(`/assets/account/${req.params.file}`, { root: "." }, (err) => {
    if (err) {
      res.sendFile("/assets/account/defaultUser.png", { root: "." });
    }
  });
});

staticRouter.get("/:type/:file", (req, res) => {
  res.sendFile(
    `/assets/${req.params.type}/${req.params.file}`,
    { root: "." },
    (err) => {
      if (err) {
        res.status(404).json({ message: "File not found" });
      }
    }
  );
});

export default staticRouter;
