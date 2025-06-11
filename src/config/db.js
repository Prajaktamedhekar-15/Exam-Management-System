const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables into process.env

const conn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

conn.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Database is connected..!!");
    }
});

module.exports = conn;