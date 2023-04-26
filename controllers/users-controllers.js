const { v4: uuidv4 } = require("uuid"); //consider changing to mysql uid
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error");
const { query } = require("../models/db");

const getUsers = async (req, res, next) => {

    const sql = `
        SELECT uid, email, username FROM users
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
        SELECT 1 FROM users
        WHERE email = ?
        LIMIT 1
    `;
    const hasEmail = await query(sqlEmail, [email]);
    if (hasEmail.length !== 0) {
        const error = new HttpError("Could not create user, email exists.", 422);
        return next(error);
    };

    const sqlUsername = `
        SELECT 1 FROM users
        WHERE username = ?
        LIMIT 1
    `;
    const hasUsername = await query(sqlUsername, [username]);
    if (hasUsername.length !== 0) {
        const error = new HttpError("Could not create user, username exists.", 422);
        return next(error);
    };

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError("Could not create user, please try again.", 500);
        return next(error);
    };
    

    const createdUser = {
        uid: uuidv4(),
        username,
        email,
        password: hashedPassword
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

    res.status(201).json({ user: createdUser.uid });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE email = ?
        LIMIT 1
    `;
    
    const identifiedUser = await query(sql, [email]);

    if (identifiedUser.length === 0) {
        const error = new HttpError("User credentials wrong.", 401);
        return next(error);
    };

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    } catch (err) {
        const error = new HttpError("Could not log you in, please try again.", 500);
        return next(error);
    };

    if (!isValidPassword) {
        const error = new HttpError("User credentials wrong.", 401);
        return next(error);
    }

    res.json({ user: identifiedUser[0].uid });
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;