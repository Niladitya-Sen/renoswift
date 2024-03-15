import { Router } from "express";
import { AdminRequest } from "../../../types/types";
import { db } from "../../../../db/db";
import { body, validationResult } from "express-validator";

const users = Router();

users.get('/customers', (req: AdminRequest, res) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const sql = `SELECT u.id, u.name, u.email, u.phoneNumber, u.isActive FROM User as u INNER JOIN UserRole as ur WHERE u.role = ur.id AND ur.role = 'Customer' AND u.isDeleted = false LIMIT ? OFFSET ?`;
    const values = [limitValue, (pageNoValue - 1) * limitValue];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

users.get('/customers/:id', (req: AdminRequest, res) => {
    const { id } = req.params;
    const sql = `SELECT u.id, u.name, u.email, u.phoneNumber, u.isActive FROM User as u INNER JOIN UserRole as ur WHERE u.role = ur.id AND ur.role = 'Customer' AND u.id = ?`;
    const values = [id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }

        res.status(200).json(results[0]);
    });
});

users.delete('/customers/:id', (req: AdminRequest, res) => {
    const { id } = req.params;
    const sql = `UPDATE User SET isDeleted = True WHERE id = ?`;
    const values = [id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error deleting data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    });
});

users.get('/operations-team', (req: AdminRequest, res) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const sql = `SELECT id, name, email, phoneNumber, isActive FROM OperationsTeam WHERE isDeleted = false LIMIT ? OFFSET ?`;
    const values = [limitValue, (pageNoValue - 1) * limitValue];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

users.post('/operations-team',
    body('name').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('phoneNumber').isLength({ min: 10, max: 10 }).isNumeric().notEmpty(),
    body('otRole').isString().notEmpty(),
    body('address').isString().notEmpty(),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name, email, phoneNumber, otRole, address } = req.body;

        const sql = `INSERT INTO OperationsTeam (name, email, phoneNumber, otRole, address) values (?, ?, ?, ?, ?)`;
        const values = [name, email, phoneNumber, otRole, address];

        db.beginTransaction((err) => {
            if (err) {
                console.error('Error beginning transaction:', err);
                db.rollback((err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(500).send('Internal Server Error');
                });
            }

            db.query(sql, values, (err, results) => {
                if (err) {
                    console.log('Error fetching data:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                db.commit(err => {
                    if (err) {
                        console.error('Error committing transaction:', err);
                        db.rollback((err) => {
                            if (err) {
                                throw err;
                            }
                            res.status(500).send('Internal Server Error');
                        });
                    }

                    res.status(200).json({ message: 'Operation team member added successfully' });
                });
            });
        });

    }
);

users.get('/operations-team/:id', (req: AdminRequest, res) => {
    const { id } = req.params;
    const sql = `SELECT id, name, email, address, phoneNumber, isActive FROM OperationsTeam WHERE id = ?`;
    const values = [id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Operation team member not found' });
            return;
        }

        res.status(200).json(results[0]);
    });
});

users.put('/operations-team/:id',
    body('email').isEmail().notEmpty(),
    body('phoneNumber').isLength({ min: 10, max: 10 }).isNumeric().notEmpty(),
    body('address').isString().notEmpty(),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array().map(error => error.msg) });
            return;
        }

        const { id } = req.params;
        const { email, phoneNumber, address } = req.body;

        const sql = `UPDATE OperationsTeam SET email = ?, phoneNumber = ?, address = ? WHERE id = ?`;
        const values = [email, phoneNumber, address, id];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).json({ message: 'Operation team member updated successfully' });
        });
    }
);

users.delete('/operations-team/:id', (req: AdminRequest, res) => {
    const { id } = req.params;
    const sql = `UPDATE OperationsTeam SET isDeleted = True WHERE id = ?`;
    const values = [id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error deleting data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).json({ message: 'Operation team member deleted successfully' });
    });
});

export default users;