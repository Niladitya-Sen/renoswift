import { Router } from 'express';
import { db } from '../../../../db/db';
import { sign } from 'jsonwebtoken';

const adminAuth = Router();

adminAuth.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT u.id, u.email, ur.role, u.password FROM User as u INNER JOIN UserRole as ur WHERE u.email = ? and u.role = ur.id`;
    const values = [email];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email' });
            return;
        }

        if (results[0].role !== 'Admin') {
            res.status(401).json({ message: 'You are not an admin' });
            return;
        }

        if (results[0].password !== password) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const jwt = sign({ email: results[0].email, role: results[0].role, adminId: results[0].id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });

        res.status(200).json({ message: 'Login successful!', token: jwt });
    });
});

export default adminAuth;