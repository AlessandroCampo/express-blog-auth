const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createSlug } = require('../utils');


module.exports = multer.diskStorage({
    destination: (req, file, cb) => {

        const uploadPath = path.join(__dirname, '../public/assets');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const data = req.body
        cb(null, (createSlug(data.title) || Date.now()) + path.extname(file.originalname));
    }
});

