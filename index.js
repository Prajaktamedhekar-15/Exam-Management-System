const dotenv = require("dotenv"); // FIRST: import dotenv
dotenv.config();                  // THEN: load .env variables

let app = require("./src/app.js");

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}/`);
});
