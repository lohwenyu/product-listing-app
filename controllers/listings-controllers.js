const HttpError = require("../models/http-error");


const DUMMY_LISTINGS = [
    {
        user_uid: "25388sd3",
        uid: "1",
        category: "Clothing",
        // image: image,
        name: "product 1", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25388sd3",
        uid: "2",
        category: "Housing",
        // image: image,
        name: "product 2", 
        price: "$5", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25388sd3",
        uid: "3",
        category: "Daily Needs",
        // image: image,
        name: "product 3", 
        price: "$20", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25388sd3",
        uid: "4",
        category: "Daily Needs",
        // image: image,
        name: "product 4", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25e88sd3",
        uid: "5",
        category: "Daily Needs",
        // image: image,
        name: "product 5", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25e88sd3",
        uid: "6",
        category: "Housing",
        // image: image,
        name: "product 6", 
        price: "$120", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25e88sd3",
        uid: "7",
        category: "Housing",
        // image: image,
        name: "product 7", 
        price: "$204", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25e88sd3",
        uid: "8",
        category: "Daily Needs",
        // image: image,
        name: "product 8", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25e88sd3",
        uid: "9",
        category: "Housing",
        // image: image,
        name: "product 9", 
        price: "$204", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        user_uid: "25e88sd3",
        uid: "10",
        category: "Daily Needs",
        // image: image,
        name: "product 10", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }

];

const getListingById = (req, res, next) => {
    const listingId = req.params.listingId;
    const listing = DUMMY_LISTINGS.find((listing) => {
        return listing.uid == listingId;
    });

    if (!listing) {
        const error = new HttpError("Could not find listing.", 404);
        return next(error);
    };

    res.json({listing});
};

const getListingsByUserId = (req, res, next) => {
    const userId = req.params.userId;
    const listings = DUMMY_LISTINGS.filter((listing) => {
        return listing.user_uid == userId;
    });

    if (listings.length == 0) {
        const error = new Error("No listings found for user", 404);
        return next(error);
    };

    res.json({listings})
};

exports.getListingById = getListingById;
exports.getListingsByUserId = getListingsByUserId;
