export const DB_CONFIG = {
    host: 'localhost',
    user: 'lab4user',
    password: 'password123',
    database: 'lab4db'
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

