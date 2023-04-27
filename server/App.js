const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users-routes");
const listingsRoutes = require("./routes/listings-routes");

const HttpError = require("./models/http-error");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join('uploads')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST"
    );
    next();
});

app.use("/api/users", usersRoutes);
app.use("/api/listings", listingsRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find route", 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT);