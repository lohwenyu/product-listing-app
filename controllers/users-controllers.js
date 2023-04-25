const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { query } = require("../models/db");

const DUMMY_USERS = [
    {
        uid: "25388sd3",
        username: "hello",
        email: "hello@test.com",
        password: "fdhsgrr838"
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const register = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid register information, check data.", 422);
    }

    const { username, email, password } = req.body;

    const hasEmail = DUMMY_USERS.find((user) => {
        return user.email === email;
    });
    if (hasEmail) {
        throw new HttpError("Could not create user, email exists.", 422);
    }

    const hasUsername = DUMMY_USERS.find((user) => {
        return user.username === username;
    });
    if (hasUsername) {
        throw new HttpError("Could not create user, username exists.", 422);
    }

    const createdUser = {
        uid: uuidv4(),
        username,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    
    const identifiedUser = DUMMY_USERS.find((user) => {
        return user.email === email;
    });

    if (!identifiedUser || identifiedUser.password !== password) {
        const error = new HttpError("User credentials wrong.", 401);
        throw error;
    };

    res.json({message: "logged in"});
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;