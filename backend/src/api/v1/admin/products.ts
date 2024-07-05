import { Router } from "express";
import { AdminRequest } from "../../../types/types";
import { db } from "../../../../db/db";
import multer from "multer";
import { body, validationResult } from "express-validator";
import crypto from 'crypto'
const products = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images/')
    },
    filename: function (req, file, cb) {
        cb(null, crypto.randomUUID() + file.mimetype.replace('image/', '.').split("+")[0]);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
});

products.get("/brands", (req: AdminRequest, res) => {
    db.query('SELECT id, name FROM Brand WHERE isDeleted = FALSE', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        res.status(200).json(result);
    });
});

products.get("/categories", (req: AdminRequest, res) => {
    db.query('SELECT id, type FROM ProductType WHERE isDeleted = FALSE', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        res.status(200).json(result);
    });
});

products.get("/suppliers", (req: AdminRequest, res) => {
    db.query('SELECT DISTINCT supplierId, name FROM ProductSuppliers WHERE isDeleted = FALSE', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        res.status(200).json(result);
    });
});

products.get("/", (req: AdminRequest, res) => {
    const limitValue = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offsetValue = req.query.offset ? parseInt(req.query.offset as string) : 0;

    if (isNaN(limitValue) || isNaN(offsetValue)) {
        res.status(400).json({ message: "Invalid query parameters" });
        return;
    }

    const sql = 'SELECT p.productId, p.name, (SELECT t.type FROM ProductType as t WHERE t.id = p.category) as category, (SELECT b.name FROM Brand as b WHERE b.id = p.brandId) as brand, p.isActive FROM Products as p WHERE isDeleted = FALSE ORDER BY createdDate DESC ';
    const values = [limitValue, offsetValue];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        res.status(200).json(result);
    });
});

products.post("/",
    upload.fields([
        { name: 'product-1', maxCount: 1 },
        { name: 'product-2', maxCount: 1 },
        { name: 'product-3', maxCount: 1 },
        { name: 'product-4', maxCount: 1 },
    ]),
    body('name').isString(),
    body('productId').isString(),
    body('category').isNumeric(),
    body('brand').isNumeric(),
    body('supplier').isString(),
    body('price').isNumeric(),
    body('productDetails').isString(),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array() });
            return;
        }

        const { name, productId, category, brand, supplier, price, productDetails } = req.body;

        if (Object.keys(req.files as Express.Multer.File[]).length !== 2) {
            res.status(400).json({ message: "Please upload 2 images" });
            return;
        }

        db.beginTransaction(err => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            const sql = 'INSERT INTO Products (name, productId, category, brandId, supplierId, price, details) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [name, productId, category, brand, supplier, price, productDetails];

            db.query(sql, values, (err, result) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.error(err);
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                db.query('SELECT productId FROM Products WHERE id = ?', [result.insertId], async (err, result) => {
                    if (err) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(err);
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    try {
                        for (const key in req.files as Express.Multer.File[]) {
                            const sql_ = 'INSERT INTO ProductImages (productId, url) VALUES (?, ?)';
                            const values_ = [result[0].productId, "/static/images/" + (req.files as any)[key][0].filename];

                            await new Promise((resolve, reject) => {
                                db.query(sql_, values_, (err, result) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(result);
                                });
                            });
                        }
                    } catch (error) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(error);
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    db.commit((err) => {
                        if (err) {
                            db.rollback((err) => {
                                console.error(err);
                            });
                            console.error(err);
                            res.status(500).json({ message: "Internal Server Error" });
                            return;
                        }

                        res.status(201).json({ message: "Product added successfully" });
                    });
                });
            });
        });
    }
);

products.get("/:id", (req: AdminRequest, res) => {
    const sql = 'SELECT p.productId, p.name, (SELECT t.type FROM ProductType as t WHERE t.id = p.category) as category, (SELECT b.name FROM Brand as b WHERE b.id = p.brandId) as brand, p.isActive, p.supplierId, p.price, p.details FROM Products as p WHERE isDeleted = FALSE AND p.productId = ?';
    const values = [req.params.id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        db.query('SELECT url FROM ProductImages WHERE productId = ? AND isDeleted = FALSE', [result[0].productId], (err, images) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            res.status(200).json({ ...result[0], images: images.map((image: any) => image.url) });
        });
    });
});

products.put("/:id",
    upload.fields([
        { name: 'product-1', maxCount: 1 },
        { name: 'product-2', maxCount: 1 },
        { name: 'product-3', maxCount: 1 },
        { name: 'product-4', maxCount: 1 },
    ]),
    body('supplier').isString(),
    body('price').isNumeric(),
    body('productDetails').isString(),
    (req: AdminRequest, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array() });
            return;
        }

        const { supplier, price, productDetails } = req.body;

        db.beginTransaction(err => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            const sql = 'UPDATE Products SET supplierId = ?, price = ?, details = ? WHERE productId = ?';
            const values = [supplier, price, productDetails, req.params.id];

            db.query(sql, values, (err, result) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.error(err);
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                if (Object.keys(req.files as Express.Multer.File[]).length !== 4) {
                    db.commit((err) => {
                        if (err) {
                            db.rollback((err) => {
                                console.error(err);
                            });
                            console.error(err);
                            res.status(500).json({ message: "Internal Server Error" });
                            return;
                        }

                        res.status(200).json({ message: "Product updated successfully" });
                    });
                    return;
                }

                db.query('UPDATE ProductImages SET isDeleted = TRUE WHERE productId = ?', [req.params.id], async (err, result) => {
                    if (err) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(err);
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    try {
                        for (const key in req.files as Express.Multer.File[]) {
                            const sql_ = 'INSERT INTO ProductImages (productId, url) VALUES (?, ?)';
                            const values_ = [req.params.id, "/static/images/" + (req.files as any)[key][0].filename];

                            await new Promise((resolve, reject) => {
                                db.query(sql_, values_, (err, result) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(result);
                                });
                            });
                        }
                    } catch (error) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(error);
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    db.commit((err) => {
                        if (err) {
                            db.rollback((err) => {
                                console.error(err);
                            });
                            console.error(err);
                            res.status(500).json({ message: "Internal Server Error" });
                            return;
                        }

                        res.status(200).json({ message: "Product updated successfully" });
                    });
                });
            });
        });
    }
);

products.delete("/:id", (req: AdminRequest, res) => {
    db.beginTransaction(err => {
        if (err) {
            db.rollback((err) => {
                console.error(err);
            });
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }

        db.query('UPDATE Products SET isDeleted = TRUE WHERE productId = ?', [req.params.id], (err, result) => {
            if (err) {
                db.rollback((err) => {
                    console.error(err);
                });
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }

            db.query('UPDATE ProductImages SET isDeleted = TRUE WHERE productId = ?', [req.params.id], (err, result) => {
                if (err) {
                    db.rollback((err) => {
                        console.error(err);
                    });
                    console.error(err);
                    res.status(500).json({ message: "Internal Server Error" });
                    return;
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback((err) => {
                            console.error(err);
                        });
                        console.error(err);
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                    }

                    res.status(200).json({ message: "Product deleted successfully" });
                });
            });
        });
    });
});

export default products;