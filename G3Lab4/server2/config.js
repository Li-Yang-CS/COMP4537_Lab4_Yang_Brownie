export const WRITER_DB_CONFIG = {
<<<<<<< HEAD
    host: process.env.DB_HOST,
    user: "lab4writer",
    password: process.env.WRITER_DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
};

export const READER_DB_CONFIG = {
    host: process.env.DB_HOST,
    user: "lab4reader",
    password: process.env.READER_DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
=======
    host: "lab4db-do-user-32507524-0.f.db.ondigitalocean.com",
    user: "lab4writer",
    password: "AVNS_1GPBjuEKeMzkbEbb2UD",
    database: "defaultdb",
    port: 25060,
>>>>>>> 3cc3f2818d9c01cb2b600e59c81fc0bffe0b2636
    ssl: { rejectUnauthorized: false }
};


export const READER_DB_CONFIG = {
    host: "lab4db-do-user-32507524-0.f.db.ondigitalocean.com",
    user: "lab4reader",
    password: "AVNS_r0_uxeVsShxqzPwlo7y",
    database: "defaultdb",
    port: 25060,
    ssl: { rejectUnauthorized: false }
};


export const STRINGS = {
    server_running: "Server is running on port 8888",
    err_method: "Method not allowed",
    success_insert: "Data inserted successfully",
    success_query: "Query executed successfully",
    err_query: "Error executing query: ",
    headers_content_type: { "Content-Type": "application/json" },
    headers_cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }
};

export const SQL = {
    createTable: `CREATE TABLE IF NOT EXISTS patient (
        patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        dateOfBirth DATETIME
    ) ENGINE=InnoDB`,
    insert: `INSERT INTO patient (name, dateOfBirth) VALUES ?`
};

export const PATIENTS_DATA = [
    ['Sara Brown', '1901-01-01'],
    ['John Smith', '1941-01-01'],
    ['Jack Ma', '1961-01-30'],
    ['Elon Musk', '1999-01-01']
];

