const express = require("express");
const { check } = require("express-validator");

const listingsControllers = require("../controllers/listings-controllers");

const router = express.Router();

router.get("/", listingsControllers.getListings);

router.get("/:listingId", listingsControllers.getListingById);

router.get("/user/:userId", listingsControllers.getListingsByUserId);

router.post("/newListing",
    [
        check("category").not().isEmpty(),
        check("name").isLength({ min: 5 }),
        check("price").isNumeric()
    ],
    listingsControllers.createNewListing
);

module.exports = router;