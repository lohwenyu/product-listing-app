const express = require("express");

const router = express.Router();

const DUMMY_USERS = [
    {
        uid: "25388sd3",
        username: "hello",
        email: "hello@test.com",
        password: "fdhsgrr838"
    }
]

router.get('/', (req, res, next) => {
    console.log("GET Request in Users");
    res.json({message: 'It works!'})
});

module.exports = router;