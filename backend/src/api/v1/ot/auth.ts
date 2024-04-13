import { Router } from "express";
import { db } from "../../../../db/db";
import { sign } from "jsonwebtoken";
import MailService from "../../../../mail";
import { getOTPFromDBByEmail, getOTPFromDBByPhoneNumber, insertOTPInDBByEmail, insertOTPInDBByPhoneNumber } from "../../../../otp";

const auth = Router();

const mailService = new MailService();

auth.post('/login/otp', async (req, res) => {
    const { email, phone } = req.body;

    if (!email && !phone) {
        res.status(400).json({ message: 'Invalid email or phone' });
        return;
    }

    let query = `SELECT name FROM OperationsTeam WHERE email = '${email}' AND isDeleted = false`;

    if (phone) {
        query = `SELECT name FROM OperationsTeam WHERE phoneNumber = '${phone}' AND isDeleted = false`;
    }

    db.query(query, async (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email' });
            return;
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        console.log(otp);

        try {
            await mailService.sendMail({
                to: email,
                subject: 'OTP for Login',
                otp: otp.toString(),
                name: results[0].name,
                authType: "Login"
            });
            if (email) {
                await insertOTPInDBByEmail(otp.toString(), email);
            } else {
                await insertOTPInDBByPhoneNumber(otp.toString(), phone);
            }
            res.status(200).json({ message: 'OTP sent successfully on your registered Email ID!' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
            throw error;
        }
    });
});

auth.post('/login', async (req, res) => {
    const { email, phone, otp } = req.body;
    const otpDB = email ? await getOTPFromDBByEmail(email) : await getOTPFromDBByPhoneNumber(phone);

    if (!otp) {
        res.status(401).json({ message: 'Please enter an OTP' });
        return;
    }

    if (otp !== otpDB) {
        res.status(401).json({ message: 'Invalid OTP' });
        return;
    }

    if (!email && !phone) {
        res.status(400).json({ message: 'Invalid email or phone' });
        return;
    }

    let query = `SELECT email, id FROM OperationsTeam WHERE email = '${email}' AND isDeleted = false`;

    if (phone) {
        query = `SELECT phoneNumber FROM OperationsTeam WHERE phoneNumber = '${phone}' AND isDeleted = false`;
    }

    db.query(query, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email' });
            return;
        }

        let jwt = "";

        if (email) {
            jwt = sign({ email, otId: results[0].id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });
        } else {
            jwt = sign({ phone, otId: results[0].id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });
        }

        res.status(200).json({ message: 'Login successful!', token: jwt });
    });
});

export default auth;
