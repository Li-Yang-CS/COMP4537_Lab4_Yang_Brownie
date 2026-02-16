const http = require('http');
const mysql = require('mysql2');
const url = require('url');

const STRINGS = {
    server_running: "Server is running on port 8888",
    db_connected: "Connected to MySQL database",
    err_db_connect: "Database connection failed: ",
    err_method: "Method not allowed",
    success_insert: "Data inserted successfully",
    success_query: "Query executed successfully",
    err_query: "Error executing query: ",
    headers_content_type: { "Content-Type": "text/plain" },
    headers_cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }
};

// Database Configuration
const dbConfig = {
    host: 'localhost',
    user: 'lab4user',
    password: 'password123',
    database: 'lab4db'
};

// Hardcoded Data for Insert
const PATIENTS_DATA = [
    ['Sara Brown', '1901-01-01'],
    ['John Smith', '1941-01-01'],
    ['Jack Ma', '1961-01-30'],
    ['Elon Musk', '1999-01-01']
];

// SQL Commands
const SQL = {
    createTable: `CREATE TABLE IF NOT EXISTS patient (
        patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        dateOfBirth DATETIME
    ) ENGINE=InnoDB`, // [cite: 14]
    insert: `INSERT INTO patient (name, dateOfBirth) VALUES ?`
};

const pool = mysql.createPool(dbConfig);

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    
    // Handle CORS (Preflight)
    if (req.method === 'OPTIONS') {
        res.writeHead(204, STRINGS.headers_cors);
        res.end();
        return;
    }

    if (req.method === 'POST' && reqUrl.pathname === '/api/insert') {
        pool.query(SQL.createTable, (err) => {
            if (err) {
                res.writeHead(500, { ...STRINGS.headers_cors, ...STRINGS.headers_content_type });
                res.end(STRINGS.err_query + err.message);
                return;
            }

            pool.query(SQL.insert, [PATIENTS_DATA], (err, result) => {
                res.writeHead(200, { ...STRINGS.headers_cors, ...STRINGS.headers_content_type });
                if (err) {
                    res.end(STRINGS.err_query + err.message);
                } else {
                    res.end(`${STRINGS.success_insert}. Rows added: ${result.affectedRows}`);
                }
            });
        });
    } 
    
    else if (req.method === 'GET' && reqUrl.pathname === '/api/query') {
        const sqlQuery = reqUrl.query.sql;
        
        pool.query(sqlQuery, (err, results) => {
            res.writeHead(200, { ...STRINGS.headers_cors, ...STRINGS.headers_content_type });
            if (err) {
                res.end(STRINGS.err_query + err.message);
            } else {
                res.end(JSON.stringify(results));
            }
        });
    } 
    
    else {
        res.writeHead(404, STRINGS.headers_cors);
        res.end("404 Not Found");
    }
});

server.listen(8888, () => {
    console.log(STRINGS.server_running);
});