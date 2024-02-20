import { db } from "../db/db";

export async function insertOTPInDBByEmail(otp: string, email: string) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO OTP (otp, email) VALUES (?, ?)', [otp, email], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

export async function insertOTPInDBByPhoneNumber(otp: string, phoneNumber: string) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO OTP (otp, phoneNumber) VALUES (?, ?)', [otp, phoneNumber], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

export async function getOTPFromDBByEmail(email: string) {
    return new Promise((resolve, reject) => {
        db.query('SELECT otp FROM OTP WHERE email = ? ORDER BY createdDate DESC', [email], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results[0].otp.toString());
        });
    });
}

export async function getOTPFromDBByPhoneNumber(phoneNumber: string) {
    return new Promise((resolve, reject) => {
        db.query('SELECT otp FROM OTP WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results[0].otp.toString());
        });
    });
}