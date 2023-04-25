const express = require("express");
const bodyParser = require("body-parser");
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "hpe",
//     password: "Hpe123"
// })

// connection.connect((error) => {
//     if (error) {
//         console.log('Error connecting to the MySQL Database');
//         return;
//     }
//     console.log('Connection established sucessfully');
// });

const usersRoutes = require("./routes/users-routes");
const listingsRoutes = require("./routes/listings-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/listings", listingsRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(8080);

// connection.end((error) => {
// });