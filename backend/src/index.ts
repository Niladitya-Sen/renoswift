import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { db } from '../db/db';
import api from './api';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));


app.use("/api", api);

app.listen(PORT, () => {
    db.connect((err) => {
        if (err) {
            console.log('Error connecting to DB:', err);
            return;
        }
        console.log('Connected to DB!');
    });
    console.log(`Server is running at http://localhost:${PORT}`);
});