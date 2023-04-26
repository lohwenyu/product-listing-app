const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { query } = require("../models/db");

const getUsers = async (req, res, next) => {

    const sql = `
        SELECT * FROM users
    `;
    const users = await query(sql);

    res.json({ users });
};

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid register information, check data.", 422);
        return next(error);
    }

    const { username, email, password } = req.body;

    const sqlEmail = `
        SELECT * FROM users
        WHERE email = ?
    `;
    const hasEmail = await query(sqlEmail, [email]);
    if (hasEmail.length !== 0) {
        const error = HttpError("Could not create user, email exists.", 422);
        return next(error);
    };

    const sqlUsername = `
        SELECT * FROM users
        WHERE username = ?
    `;
    const hasUsername = await query(sqlUsername, [username]);
    if (hasUsername.length !== 0) {
        const error = HttpError("Could not create user, username exists.", 422);
        return next(error);
    };

    const createdUser = {
        uid: uuidv4(),
        username,
        email,
        password
    };

    const sql = `
        INSERT INTO users
            (uid, username, email, password)
            VALUES (?, ?, ?, ?)
    `;
    const result = await query(sql, [
        createdUser.uid,
        createdUser.username,
        createdUser.email,
        createdUser.password
    ]);

    res.status(201).json({ user: createdUser, result: result });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;
    const identifiedUser = await query(sql, [email]);

    if (identifiedUser.length === 0 || identifiedUser[0].password !== password) {
        console.log(identifiedUser);
        const error = new HttpError("User credentials wrong.", 401);
        return next(error);
    };

    res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;