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

        console.log("database is failed..!!");

        

    }
    else {
        console.log("database is connected..!!");
    }
});

module.exports = conn;