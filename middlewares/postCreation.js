const utils = require('../utils.js')

module.exports = (req, res, next) => {
    const { title, content, author } = req.body;
    const image = req.file;

    let errors = [];

    if (image) {
        if (!['image/jpeg', 'image/png'].includes(image.mimetype)) {
            errors.push("Invalid image type. Only JPEG and PNG are allowed.");
        }
        if (image.size > 1024 * 1024) {
            errors.push("Image size too large. Maximum size allowed is 1MB.");
        }
    }

    if (!title || title.trim().length === 0) {
        errors.push("Title is required.");
    } else if (title.length > 100) {
        errors.push("Title is too long. Maximum length allowed is 100 characters.");
    }


    if (errors.length === 0) {
        next();
    } else {
        if (image) {
            utils.deletePublicFile(image.filename);
        }
        const error = new Error('Validation failed');
        error.status = 406;
        error.list = errors;
        throw error;
    }
};
