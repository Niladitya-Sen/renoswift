import { Router } from 'express';
import { db } from '../../../../db/db'; // Adjust path to your db configuration

const ContactSubmissions = Router();

// POST request to insert a new submission
ContactSubmissions.post('/', async (req, res) => {
    const { name, email, phone, info } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !info) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const results = await db.query('INSERT INTO ContactSubmissions (name, email, phone, info) VALUES (?, ?, ?, ?)', [name, email, phone, info]);
        res.status(201).json({ message: 'Submission added successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Failed to insert data' });
    }
});

// GET request to fetch all submissions
ContactSubmissions.get('/', async (req, res) => {
    db.query(
        `SELECT * FROM ContactSubmissions`,
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

export default ContactSubmissions;
