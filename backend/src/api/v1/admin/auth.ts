import { Router } from 'express';
import { db } from '../../../../db/db';
import { sign } from 'jsonwebtoken';

const adminAuth = Router();

adminAuth.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT id, email, password, role FROM Admin WHERE email = ?`;
    const values = [email];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'User not found.' });
            return;
        }

        if (results[0].password !== password) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const jwt = sign({ email: results[0].email, role: 'Admin', adminId: results[0].id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });

        res.status(200).json({ message: 'Login successful!', token: jwt });
    });
});

export default adminAuth;