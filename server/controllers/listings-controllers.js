const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { query } = require("../models/db");

const getListingsByCategory = async (req, res, next) => {
    const category = req.params.category;

    let sql;
    if (category === "all") {
        sql = `SELECT * FROM listings`;
    } else {
        sql = `
            SELECT * FROM listings
            WHERE category = ?
        `;
    };

    const listings = await query(sql, [category]);

    res.json({ listings });
};

const getListingBySearch = async (req, res, next) => {
    const searchText = req.params.searchText;

    if (searchText === "all") {
        sql = `SELECT * FROM listings`;
    } else {
        sql = `
            SELECT * FROM listings
            WHERE MATCH (name, category, description)
            AGAINST (? WITH QUERY EXPANSION);
        `;
    };

    const listings = await query(sql, [searchText]);

    res.json({ listings });
};

const getListingById = async (req, res, next) => {
    const listingId = req.params.listingId;

    const sql = `
        SELECT * FROM listings
        WHERE uid = ?
    `;

    const listing = await query(sql, [listingId]);

    if (!listing || listing.length === 0) {
        const error = new HttpError("Could not find listing.", 404);
        return next(error);
    };

    res.json({ listing });
};

const getListingsByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    const sql = `
        SELECT * FROM listings
        WHERE user_uid = ?
    `;

    const listings = await query(sql, [userId]);

    if (!listings || listings.length === 0) {
        const error = new Error("No listings found for user", 404);
        return next(error);
    };

    res.json({ listings })
};

const createNewListing = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Ensure all required fields are fileld.", 422);
        return next(error);
    } else if (req.file === undefined) {
        const error = new HttpError("Add at least 1 image.", 422);
        return next(error);
    };

    console.log(req.file.path);
    const { user_uid, category, name, price, description } = req.body;
    const createdNewListing = {
        uid: uuidv4(),
        user_uid,
        category,
        name,
        price,
        description,
        image: req.file.path
    };

    const sql = `
        INSERT INTO listings
            (uid, user_uid, category, name, price, description, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
        createdNewListing.uid,
        createdNewListing.user_uid,
        createdNewListing.category,
        createdNewListing.name,
        createdNewListing.price,
        createdNewListing.description,
        createdNewListing.image
    ]);

    res.status(201).json({ listing: createdNewListing });
};

exports.getListingsByCategory = getListingsByCategory;
exports.getListingBySearch = getListingBySearch;
exports.getListingById = getListingById;
exports.getListingsByUserId = getListingsByUserId;
exports.createNewListing = createNewListing;
