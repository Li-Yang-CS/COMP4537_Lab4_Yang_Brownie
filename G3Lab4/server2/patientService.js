import { writerDb, readerDb } from './db.js';

export class PatientService {
    constructor(writer, reader) {
        this.writer = writer;
        this.reader = reader;
    }

    async ensureTableExists() {
        const createSql = `
        CREATE TABLE IF NOT EXISTS patient (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            dob DATE NOT NULL,
            gender ENUM('M','F','O') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
        `;
        await this.writer.query(createSql);
    }

    // For GET /sql
    async runReadQuery(sql) {
        // Optional extra safety: reject obvious harmful keywords
        const forbidden = ['DELETE', 'DROP', 'UPDATE', 'INSERT', 'CREATE', 'ALTER'];
        const upper = sql.toUpperCase();
        if (!upper.trim().startsWith('SELECT')) {
        throw new Error('Only SELECT statements are allowed.');
        }
        if (forbidden.some(k => upper.includes(k))) {
        throw new Error('Forbidden keyword detected in query.');
        }

        const rows = await this.reader.query(sql);
        return rows;
    }
}

export const patientService = new PatientService(writerDb, readerDb);