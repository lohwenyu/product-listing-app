const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); //consider changing to mysql uid

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "imgae/jpg": "jpg"
};

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            console.log(file);
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, `${uuidv4()}.${ext}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error("Invalid mime type");
        cb(error, isValid);
    }
});

module.exports = fileUpload;