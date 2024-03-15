import { Router } from "express";
import { sign } from 'jsonwebtoken';
import { db } from "../../../../db/db";
import { body, validationResult } from 'express-validator';
import MailService from "../../../../mail";
import { insertOTPInDBByEmail, insertOTPInDBByPhoneNumber, getOTPFromDBByEmail, getOTPFromDBByPhoneNumber } from "../../../../otp";

const auth = Router();
const mailService = new MailService();

auth.post('/login/otp', async (req, res) => {
    const { email, phone } = req.body;

    if (!email && !phone) {
        res.status(400).json({ message: 'Invalid email or phone' });
        return;
    }

    let query = `SELECT name FROM User WHERE email = '${email}'`;

    if (phone) {
        query = `SELECT name FROM User WHERE phoneNumber = '${phone}'`;
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
            res.status(200).json({ message: 'OTP sent successfully!' });
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

    let query = `SELECT email, id FROM User WHERE email = '${email}'`;

    if (phone) {
        query = `SELECT phoneNumber FROM User WHERE phoneNumber = '${phone}'`;
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
            jwt = sign({ email, userId: results[0].id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });
        } else {
            jwt = sign({ phone, userId: results[0].id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });
        }

        res.status(200).json({ message: 'Login successful!', token: jwt });
    });
});

auth.post('/signup/otp', body('email').isEmail(), (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: 'Invalid Credentials' });
        return;
    }

    const { email, name } = req.body;

    db.query('SELECT id FROM User WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);

        try {
            await mailService.sendMail({
                to: email,
                subject: 'OTP for Signup',
                otp: otp.toString(),
                name: name,
                authType: "Signup"
            });
            await insertOTPInDBByEmail(otp.toString(), email);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
            throw error;
        }

        res.status(200).json({ message: 'OTP sent successfully!' });
    });
});

auth.post('/signup', body('name').notEmpty(), body('email').isEmail(), body('phone').isMobilePhone('en-IN'), async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: 'Invalid Credentials' });
        return;
    }

    const { name, email, phone, otp } = req.body;
    const otpDB = email ? await getOTPFromDBByEmail(email) : await getOTPFromDBByPhoneNumber(phone);

    if (!otp) {
        res.status(401).json({ message: 'Please enter an OTP' });
        return;
    }

    if (otp !== otpDB) {
        res.status(401).json({ message: 'Invalid OTP' });
        return;
    }

    db.query('SELECT id FROM User WHERE email = ? OR phoneNumber = ?', [email, phone], (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        db.beginTransaction((err) => {
            if (err) {
                console.log('Error starting transaction:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            db.query('INSERT INTO User (name, email, phoneNumber, role) VALUES (?, ?, ?, 1)', [name, email, phone], (err, results) => {
                if (err) {
                    db.rollback(() => {
                        console.log('Error inserting data:', err);
                        res.status(500).send('Internal Server Error');
                    });
                    return;
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback(() => {
                            console.log('Error committing transaction:', err);
                            res.status(500).send('Internal Server Error');
                        });
                        return;
                    }

                    const jwt = sign({ email, userId: results.insertId }, process.env.JWT_SECRET as string, { expiresIn: '15 days' });

                    res.status(201).json({ message: 'Sign up successfull', token: jwt });
                });
            });
        });
    });
});

export default auth;