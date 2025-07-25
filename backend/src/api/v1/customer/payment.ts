import { Router } from "express";
import { UserRequest } from "../../../types/types";
import { db } from "../../../../db/db";
import crypto from "crypto";

const payment = Router();

payment.get("/amount/:paymentId", (req: UserRequest, res) => {
  const paymentId = req.params.paymentId;
  const userId = req.userId;

  db.query(
    "SELECT amountPaid, phase FROM Payment WHERE id = ? AND userId = ?",
    [paymentId, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Payment not found" });
      }

      res.status(200).json(result[0]);
    }
  );
});

payment.post("/initiate", (req: UserRequest, res) => {
  const { amount, quoteId, phase } = req.body;
  const userId = req.userId;

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);

      db.rollback((err) => {
        if (err) {
          console.error(err);
        }
        return res.status(500).json({ error: "Internal Server Error" });
      });

      return;
    }

    db.query(
      "INSERT INTO Payment (userId, quoteId, amountPaid, amountDue, status, phase, method) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        quoteId,
        amount,
        phase === "design" ? amount : amount,
        "initiated",
        phase,
        "Visa Card",
      ],
      (err, result) => {
        if (err) {
          console.error(err);

          db.rollback((err) => {
            if (err) {
              console.error(err);
            }
            return res.status(500).json({ error: "Internal Server Error" });
          });
        }

        db.commit((err) => {
          if (err) {
            db.rollback((err) => {
              if (err) {
                console.error(err);
              }
              return res.status(500).json({ error: "Internal Server Error" });
            });
          }

          res.status(200).json({
            message: "Payment initiated successfully!",
            paymentId: result.insertId,
          });
        });
      }
    );
  });
});

payment.post("/confirm", (req: UserRequest, res) => {
  const { paymentId } = req.body;
  const userId = req.userId;

  db.beginTransaction((err) => {
    if (err) {
      db.rollback((err) => {
        if (err) {
          console.error(err);
        }
      });
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    db.query(
      "UPDATE Payment SET status = ? WHERE id = ? AND userId = ?",
      ["done", paymentId, userId],
      (err, result) => {
        if (err) {
          db.rollback((err) => {
            if (err) {
              console.error(err);
            }
          });
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        db.query(
          "INSERT INTO Order_ (userId, quoteId, status) VALUES (?, (SELECT quoteId FROM Payment WHERE id = ?), ?)",
          [userId, paymentId, "pending"],
          (err, result) => {
            if (err) {
              db.rollback((err) => {
                if (err) {
                  console.error(err);
                }
              });
              console.error(err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }

            db.query(
              "SELECT paymentId FROM Payment WHERE id = ?",
              [paymentId],
              (err, result) => {
                if (err) {
                  db.rollback((err) => {
                    if (err) {
                      console.error(err);
                    }
                  });
                  res.status(500).json({ error: "Internal Server Error" });
                  return;
                }

                db.commit((err) => {
                  if (err) {
                    db.rollback((err) => {
                      if (err) {
                        console.error(err);
                      }
                    });
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }

                  res.status(200).json({
                    message: "Payment confirmed successfully!",
                    paymentId: result[0].paymentId,
                  });
                });
              }
            );
          }
        );
      }
    );
  });
});

payment.post("/confirm/design", (req: UserRequest, res) => {
  const { paymentId } = req.body;
  const userId = req.userId;

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
      "UPDATE Payment SET status = ? WHERE id = ? AND userId = ?",
      ["done", paymentId, userId],
      (err, result) => {
        if (err) {
          db.rollback((err) => {
            if (err) {
              console.error(err);
            }
            return res.status(500).json({ error: "Internal Server Error" });
          });
        }

        db.query(
          "SELECT paymentId FROM Payment WHERE id = ?",
          [paymentId],
          (err, result) => {
            if (err) {
              db.rollback((err) => {
                if (err) {
                  console.error(err);
                }
                return res.status(500).json({ error: "Internal Server Error" });
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
                message: "Payment confirmed successfully!",
                paymentId: result[0].paymentId,
              });
            });
          }
        );
      }
    );
  });
});

payment.post("/create-order", async (req: UserRequest, res) => {
  try {
    const { amount, quoteId, phase } = req.body;

    db.beginTransaction((err) => {
      if (err) {
        console.error(err);

        db.rollback((err) => {
          if (err) {
            console.error(err);
          }
          return res.status(500).json({ error: "Internal Server Error" });
        });

        return;
      }

      db.query(
        "INSERT INTO Payment (userId, quoteId, amountPaid, amountDue, status, phase, method, receipt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          req.userId,
          quoteId,
          0,
          amount,
          "initiated",
          phase,
          "",
          crypto.randomBytes(16).toString("hex"),
        ],
        (err, result) => {
          if (err) {
            console.error(err);

            db.rollback((err) => {
              if (err) {
                console.error(err);
              }
              return res.status(500).json({ error: "Internal Server Error" });
            });
          }

          db.commit((err) => {
            if (err) {
              db.rollback((err) => {
                if (err) {
                  console.error(err);
                }
                return res.status(500).json({ error: "Internal Server Error" });
              });
            }

            res.status(200).json({ paymentId: result.insertId });
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

payment.post("/success", async (req: UserRequest, res) => {
  try {
    // getting the details back from our font-end
    const { paymentId, amount } = req.body;

    const userId = req.userId;

    if (req.query.phase === "design") {
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
          "UPDATE Payment p SET p.status = ?, p.amountPaid = ?, p.amountDue = 0, p.finalDueDate = STR_TO_DATE((SELECT qr.timeline FROM QuoteReply qr WHERE qr.quoteId = p.quoteId), '%d/%m/%Y') WHERE p.id = ? AND p.userId = ?",
          ["done", amount, paymentId, userId],
          (err, result) => {
            if (err) {
              db.rollback((err) => {
                if (err) {
                  console.error(err);
                }
                return res.status(500).json({ error: "Internal Server Error" });
              });
            }

            db.query(
              "SELECT paymentId FROM Payment WHERE id = ?",
              [paymentId],
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
                    message: "Payment confirmed successfully!",
                    paymentId: result[0].paymentId,
                  });
                });
              }
            );
          }
        );
      });

      return;
    }

    db.beginTransaction((err) => {
      if (err) {
        db.rollback((err) => {
          if (err) {
            console.error(err);
          }
        });
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const sql = `UPDATE Payment p SET p.status = ?, p.amountPaid = ?, p.amountDue = 0, p.finalDueDate = STR_TO_DATE((SELECT qr.timeline FROM QuoteReply qr WHERE qr.quoteId = p.quoteId), '%d/%m/%Y') WHERE p.id = ? AND p.userId = ?`;

      db.query(sql, ["done", amount, paymentId, userId], (err, result) => {
        if (err) {
          db.rollback((err) => {
            if (err) {
              console.error(err);
            }
          });
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        db.query(
          "INSERT INTO Order_ (userId, quoteId, status) VALUES (?, (SELECT quoteId FROM Payment WHERE id = ?), ?)",
          [userId, paymentId, "pending"],
          (err, result) => {
            if (err) {
              db.rollback((err) => {
                if (err) {
                  console.error(err);
                }
              });
              console.error(err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }

            db.query(
              "SELECT paymentId FROM Payment WHERE id = ?",
              [paymentId],
              (err, result) => {
                if (err) {
                  db.rollback((err) => {
                    if (err) {
                      console.error(err);
                    }
                  });
                  res.status(500).json({ error: "Internal Server Error" });
                  return;
                }

                db.commit((err) => {
                  if (err) {
                    db.rollback((err) => {
                      if (err) {
                        console.error(err);
                      }
                    });
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }

                  res.json({
                    msg: "success",
                  });
                });
              }
            );
          }
        );
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

payment.get("/", (req: UserRequest, res) => {
  const sql =
    "SELECT o.orderId, o.createdDate, o.status, (SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId AND p.status = 'done') as amountPaid, (SELECT SUM(p.amountDue) FROM Payment as p WHERE o.quoteId = p.quoteId AND p.status = 'done') as amountDue, (SELECT p.finalDueDate FROM Payment as p WHERE p.quoteId = o.quoteId ORDER BY p.createdDate DESC LIMIT 1) as finalDueDate FROM Order_ as o WHERE o.userId = ? ORDER BY o.createdDate DESC; ";

  db.query(sql, [req.userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json(result);
  });
});

payment.get("/:orderId", (req: UserRequest, res) => {
  const sql =
    "SELECT o.orderId, o.createdDate, o.status, (SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId AND p.status = 'done') as amountPaid, (SELECT SUM(p.amountDue) FROM Payment as p WHERE o.quoteId = p.quoteId AND p.status = 'done') as amountDue, (SELECT p.finalDueDate FROM Payment as p WHERE p.quoteId = o.quoteId ORDER BY p.createdDate DESC LIMIT 1) as finalDueDate FROM Order_ as o WHERE o.userId = ? AND o.orderId = ? ORDER BY o.createdDate DESC;";

  db.query(sql, [req.userId, req.params.orderId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    db.query(
      "SELECT p.phase, p.amountPaid as amount, p.finalDueDate as dueDate, p.status FROM Payment p INNER JOIN Order_ o WHERE o.orderId = ? AND o.quoteId = p.quoteId",
      [req.params.orderId],
      (err, payments) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json({ ...result[0], payments });
      }
    );
  });
});

export default payment;
