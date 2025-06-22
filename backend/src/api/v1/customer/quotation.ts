import { Router } from "express";
import { body, query, validationResult } from "express-validator";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";

const quotation = Router();

quotation.post(
  "/",
  body("propertyId").isNumeric(),
  body("name").isString(),
  body("phone").isMobilePhone("en-IN"),
  body("email").isEmail(),
  body("address").isString(),
  body("country").isString(),
  body("state").isString(),
  body("remodelingDate").isDate(),
  body("zipcode").isPostalCode("IN"),
  (req: UserRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      propertyId,
      name,
      phone,
      email,
      address,
      country,
      state,
      remodelingDate,
      zipcode,
      specialRequest,
    } = req.body;

    db.beginTransaction((err) => {
      if (err) {
        db.rollback((err) => {
          if (err) {
            console.error(err);
          }

          return res.status(500).json({ error: "Internal Server Error" });
        });
      }

      db.query(
        "INSERT INTO Quote (propertyId, userId, name, contactNumber, email, address, country, state, remodelingDate, zipcode, specialRequest) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          propertyId,
          req.userId,
          name,
          phone,
          email,
          address,
          country,
          state,
          remodelingDate,
          zipcode,
          specialRequest,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
          }

          db.query(
            "SELECT * FROM Quote WHERE id = ?",
            [result.insertId],
            (err, result) => {
              if (err) {
                db.rollback((err) => {
                  if (err) {
                    console.error(err);
                  }
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                });
              }

              db.commit((err) => {
                if (err) {
                  db.rollback((err) => {
                    if (err) {
                      console.error(err);
                    }
                    return res
                      .status(500)
                      .json({ error: "Internal Server Error" });
                  });
                }

                res.status(200).json({
                  message: "Quotation request submitted successfully!",
                  quotationId: result[0].quoteId,
                });
              });
            }
          );
        }
      );
    });
  }
);

quotation.get(
  "/raised",
  query("limit").isNumeric().withMessage("Limit should be a number"),
  query("pageNo").isNumeric().withMessage("Page number should be a number"),
  (req: UserRequest, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }

    let limit = parseInt(req.query.limit as string);
    let pageNo = parseInt(req.query.pageNo as string);

    if (limit < 1) {
      limit = 10;
    }

    if (pageNo < 1) {
      pageNo = 1;
    }

    const sql =
      "SELECT quoteId, createdDate FROM Quote WHERE userId = ? ORDER BY createdBy DESC ";
    const values = [req.userId, limit, (pageNo - 1) * limit];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(200).json(result);
    });
  }
);

quotation.get("/raised/:quoteId", (req: UserRequest, res) => {
  const quoteId = req.params.quoteId;

  const sql =
    "SELECT q.quoteId, q.createdDate, q.propertyId, up.length, up.breadth, up.height, up.area, up.doors, up.windows, up.budget, up.issues, up.objective, up.style, up.timeline, up.specialRequest, q.address FROM Quote as q INNER JOIN UserProperty as up WHERE q.quoteId = ? AND q.propertyId = up.id";
  const values = [quoteId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    db.query(
      "SELECT id, type, url FROM UserPropertyAssets WHERE propertyId = ?",
      [result[0].propertyId],
      (err, assets) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({
          ...result[0],
          assets,
        });
      }
    );
  });
});

quotation.get("/received", (req: UserRequest, res) => {
  const limitValue = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const pageNoValue = req.query.pageNo
    ? parseInt(req.query.pageNo as string)
    : 1;

  const limit = limitValue < 1 ? 10 : limitValue;
  const pageNo = pageNoValue < 1 ? 1 : pageNoValue;

  const sql =
    "SELECT quoteId, createdDate FROM Quote WHERE status = 'sent' AND userId = ? ORDER BY createdBy DESC ";

  const values = [req.userId, limit, (pageNo - 1) * limit];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json(result);
  });
});

quotation.get("/received/:quoteId", (req: UserRequest, res) => {
  const quoteId = req.params.quoteId;

  const sql =
    "SELECT quoteId, designPlan, quotation, timeline, teamRemarks, customerRemarks, createdDate, amount FROM QuoteReply WHERE quoteId = ?";
  const values = [quoteId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    db.query(
      "SELECT id FROM Payment WHERE quoteId = ? AND userId = ? AND (phase = 'design' OR phase = 'order') AND status = 'done'",
      [quoteId, req.userId],
      (err, result_) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        switch (result_.length) {
          case 0: {
            return res.status(200).json({
              ...result[0],
              isPaid: false,
              isFullyPaid: false,
            });
          }
          case 1: {
            return res.status(200).json({
              ...result[0],
              isPaid: true,
              isFullyPaid: false,
            });
          }
          case 2: {
            return res.status(200).json({
              ...result[0],
              isPaid: true,
              isFullyPaid: true,
            });
          }
          default: {
            return res.status(200).json({
              ...result[0],
              isPaid: false,
              isFullyPaid: false,
            });
          }
        }
      }
    );
  });
});

export default quotation;
