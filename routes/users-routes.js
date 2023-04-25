const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post("/register",
    [
        check("username").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 8 })
    ],
    usersControllers.register
);

router.post("/login", usersControllers.login);

module.exports = router;