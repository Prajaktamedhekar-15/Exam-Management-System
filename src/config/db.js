let mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Prajakta1510",
    database: "examapp"
});

conn.connect((err) => {
    if (err) {
        console.log("database is connected..!!");
    }
    else {
        console.log("database is connected..!!");
    }
});

module.exports = conn;