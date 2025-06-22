import { Router } from "express";
import { UserRequest } from "../../../types/types";
import { db } from "../../../../db/db";
import multer from "multer";
import crypto from "crypto";
import { body, validationResult } from "express-validator";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/account/");
  },
  filename: function (req: UserRequest, file, cb) {
    cb(
      null,
      crypto.randomUUID() +
        "_" +
        req.userId +
        file.mimetype.replace("image/", ".").split("+")[0]
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

const profile = Router();

profile.get("/", (req: UserRequest, res) => {
  console.log(req.userId);
  db.query(
    "SELECT name, email, phoneNumber, imageURL, address FROM User WHERE id = ?",
    [req.userId],
    (err, result) => {
        if (err) {
          console.log(err)
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        ...result[0],
        imageURL: result[0].imageURL
          ? `/static/profile/image/${result[0].imageURL.split("/").pop()}`
          : "/static/profile/image/defaultUser.jpg",
      });
    }
  );
});

profile.put(
  "/",
  upload.any(),
  body("name").isString().isLength({ min: 1, max: 255 }),
  body("email").isEmail(),
  body("phoneNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid phone number")
    .isNumeric()
    .withMessage("Invalid phone number"),
  body("address").isString().isLength({ min: 0, max: 255 }),
  (req: UserRequest, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid input",
        errors: errors.formatWith(({ msg }) => msg).mapped(),
      });
    }

    const { name, email, phoneNumber, address } = req.body;

    db.beginTransaction((err) => {
      if (err) {
        db.rollback(() => {
          res.status(500).json({ message: "Internal Server Error" });
          throw err;
        });
      }

      let sql =
        "UPDATE User SET name = ?, email = ?, phoneNumber = ?, address = ? WHERE id = ?";
      let values = [name, email, phoneNumber, address, req.userId];

      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        sql =
          "UPDATE User SET name = ?, email = ?, phoneNumber = ?, address = ?, imageURL = ? WHERE id = ?";
        values = [
          name,
          email,
          phoneNumber,
          address,
          "/assets/account/" + req.files[0].filename,
          req.userId,
        ];
      }

      db.query(sql, values, (err, result) => {
        if (err) {
          db.rollback(() => {
            res.status(500).json({ message: "Internal Server Error" });
            throw err;
          });
        }

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              res.status(500).json({ message: "Internal Server Error" });
              throw err;
            });
          }

          res.status(200).json({ message: "Profile updated successfully" });
        });
      });
    });
  }
);

profile.delete("/", (req: UserRequest, res) => {
  db.beginTransaction((err) => {
    if (err) {
      db.rollback(() => {
        res.status(500).json({ message: "Internal Server Error" });
        throw err;
      });
    }

    db.query(
      "UPDATE User SET isDeleted = TRUE WHERE id = ?",
      [req.userId],
      (err, result) => {
        if (err) {
          db.rollback(() => {
            res.status(500).json({ message: "Internal Server Error" });
            throw err;
          });
        }

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              res.status(500).json({ message: "Internal Server Error" });
              throw err;
            });
          }

          res.status(200).json({ message: "Account deleted successfully" });
        });
      }
    );
  });
});

export default profile;
