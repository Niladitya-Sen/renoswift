import { Router } from "express";
import { db } from "../../../../db/db";
import MailService from "../../../../mail"; 

const subscriptionEmail = Router();
const mailService = new MailService(); 

subscriptionEmail.post("/", (req, res) => {
    const { email } = req.body;

    db.query(
        `SELECT COUNT(*) AS count FROM SubscriptionEmails WHERE email = ?`,
        [email],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
                return;
            }

            if (results[0].count > 0) {
                res.status(400).json({ message: "Email is already subscribed" });
                return;
            }

            // If the email doesn't exist, insert it into the table
            db.query(
                `INSERT INTO SubscriptionEmails (email) VALUES (?)`,
                [email],
                async (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "Internal server error" });
                        return;
                    }

                    // Send confirmation email
                    try {
                        await mailService.sendSubscriptionConfirmation({ to: email });
                        res.status(201).json({ message: "Thank You For The Subscription" });
                    } catch (error) {
                        console.error("Error sending confirmation email:", error);
                        res.status(500).json({ message: "Failed to send confirmation email" });
                    }
                }
            );
        }
    );
});

subscriptionEmail.get("/", (req, res) => {
    db.query(
        `SELECT email, modifiedDate FROM SubscriptionEmails`,
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
            res.status(200).json(results);
        }
    );
});

export default subscriptionEmail;
