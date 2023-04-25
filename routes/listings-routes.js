const express = require("express");

const listingsControllers = require("../controllers/listings-controllers");

const router = express.Router();

router.get("/:listingId", listingsControllers.getListingById);

router.get("/user/:userId", listingsControllers.getListingsByUserId);

module.exports = router;