import http from 'http';
import url from 'url';
import mysql from 'mysql2';
import {STRINGS, SQL, PATIENTS_DATA, DB_CONFIG} from './config.js';

const PORT = process.env.PORT || 8888;
const pool = mysql.createPool(DB_CONFIG);

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

server.listen(PORT, () => {
    console.log(STRINGS.server_running);
});