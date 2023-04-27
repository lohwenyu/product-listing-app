const express = require("express");
const { check } = require("express-validator");

const listingsControllers = require("../controllers/listings-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/:category", listingsControllers.getListingsByCategory);

router.get("/search/:searchText", listingsControllers.getListingBySearch);

router.get("/id/:listingId", listingsControllers.getListingById);

router.get("/user/:userId", listingsControllers.getListingsByUserId);

router.post(
    "/newListing",
    fileUpload.single("image"),
    [
        check("category").not().isEmpty(),
        check("name").isLength({ min: 5 }),
        check("price").isNumeric()
    ],
    listingsControllers.createNewListing
);

module.exports = router;