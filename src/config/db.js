let mysql = require("mysql2");
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nikita2608",
    database: "examapp"
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