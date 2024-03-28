import { Router } from "express";
import { AdminRequest } from "../../../types/types";
import { body, param } from "express-validator";
import { db } from "../../../../db/db";

const suppliers = Router();

suppliers.get("/", (req: AdminRequest, res) => {
    const { limit, pageNo } = req.query;

    const limitValue = limit ? parseInt(limit as string) : 10;
    const offsetValue = pageNo ? parseInt(pageNo as string) : 0;

    if (isNaN(limitValue) || isNaN(offsetValue)) {
        res.status(400).json({ message: "Invalid limit or offset" });
        return;
    }

    db.query('SELECT supplierId, name, email, phoneNumber, isActive FROM ProductSuppliers ORDER BY createdDate DESC ', [limitValue, offsetValue], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        res.status(200).json(result);
    });
});

suppliers.post("/",
    body("address").isString(),
    body("brandDealings").isString(),
    body("contactNumber").isNumeric().isLength({ min: 10, max: 10 }),
    body("email").isEmail(),
    body("name").isString(),
    body("spoc").isString(),
    body("supplierId").isString(),
    body("yearOperation").isNumeric(),
    (req: AdminRequest, res) => {
        const { address, brandDealings, contactNumber, email, name, spoc, supplierId, yearOperation } = req.body;
        db.beginTransaction((err) => {
            if (err) {
                console.error(err);
                db.rollback((err) => {
                    console.error(err);
                });
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            const sql = 'INSERT INTO ProductSuppliers (address, phoneNumber, email, name, spoc, yearsInOperation) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [address, contactNumber, email, name, spoc, yearOperation];

            db.query(sql, values, async (err, result) => {
                if (err) {
                    console.error(err);
                    db.rollback((err) => {
                        console.error(err);
                    });
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                try {
                    for (const brand of brandDealings.split(',')) {
                        await new Promise((resolve, reject) => {
                            db.query('INSERT INTO ProductSupplierBrands (supplierId, brandId) SELECT supplierId, ? FROM ProductSuppliers WHERE id = ?', [brand, result.insertId], (err, result) => {
                                if (err) {
                                    console.error(err);
                                    reject(new Error(err.message));
                                    return;
                                }

                                resolve(result);
                            });
                        });
                    }
                } catch (error) {
                    console.error(error);
                    db.rollback((err) => {
                        console.error(err);
                    });
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                db.commit((err) => {
                    if (err) {
                        console.error(err);
                        db.rollback((err) => {
                            console.error(err);
                        });
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    res.status(200).json({ message: "Supplier added successfully" });
                });
            });
        });
    }
);

suppliers.get("/:supplierId",
    param("supplierId").isString(),
    (req: AdminRequest, res) => {
        const { supplierId } = req.params;

        db.query('SELECT supplierId, name, email, phoneNumber, isActive, spoc, createdDate, yearsInOperation, address FROM ProductSuppliers WHERE supplierId = ?', [supplierId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            if (result.length === 0) {
                res.status(404).json({ message: "Supplier not found" });
                return;
            }

            db.query('SELECT brandId FROM ProductSupplierBrands WHERE supplierId = ?', [supplierId], (err, brands) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                res.status(200).json({ ...result[0], brands });
            });
        });
    }
);

suppliers.put("/:supplierId",
    param("supplierId").isString(),
    body("address").isString(),
    body("brandDealings").isString(),
    body("contactNumber").isNumeric().isLength({ min: 10, max: 10 }),
    body("email").isEmail(),
    body("name").isString(),
    body("spoc").isString(),
    body("supplierId").isString(),
    body("yearOperation").isNumeric(),
    (req: AdminRequest, res) => {
        const { address, brandDealings, contactNumber, email, name, spoc, supplierld, yearOperation } = req.body;
        const { supplierId } = req.params;

        db.beginTransaction((err) => {
            if (err) {
                console.error(err);
                db.rollback((err) => {
                    console.error(err);
                });
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            const sql = 'UPDATE ProductSuppliers SET address = ?, phoneNumber = ?, email = ?, name = ?, spoc = ?, yearsInOperation = ? WHERE supplierId = ?';
            const values = [address, contactNumber, email, name, spoc, yearOperation, supplierId];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error(err);
                    db.rollback((err) => {
                        console.error(err);
                    });
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                db.query('SELECT id FROM ProductSupplierBrands WHERE supplierId = ?', [supplierId], async (err, result) => {
                    if (err) {
                        console.error(err);
                        db.rollback((err) => {
                            console.error(err);
                        });
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    try {
                        for (const brand of brandDealings.split(',')) {
                            if (result.find((r: any) => r.id === brand)) {
                                continue;
                            }

                            await new Promise((resolve, reject) => {
                                db.query('INSERT INTO ProductSupplierBrands (supplierId, brandId) VALUES (?, ?)', [supplierId, brand], (err, result) => {
                                    if (err) {
                                        console.error(err);
                                        reject(new Error(err.message));
                                        return;
                                    }

                                    resolve(result);
                                });
                            });
                        }
                    } catch (error) {
                        console.error(error);
                        db.rollback((err) => {
                            console.error(err);
                        });
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }
                });

                db.commit((err) => {
                    if (err) {
                        console.error(err);
                        db.rollback((err) => {
                            console.error(err);
                        });
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    res.status(200).json({ message: "Supplier updated successfully" });
                });
            });
        });
    }
);

export default suppliers;