
const posts = require('../postsDb.json');
const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    const slug = req.params.slug;
    const dbPath = path.resolve(__dirname, '../postsDb.json');
    const currentPosts = JSON.parse(fs.readFileSync(dbPath));
    const postExists = currentPosts.some(p => slug === p.slug);


    if (postExists) {
        next();
        return;
    }

    res.format({
        "html": () => {
            res.type("html").status(404).send(`<h1> Could not find post with slug ${slug}</h1>`);
        },
        "json": () => {
            res.type("json").status(404).send({
                success: false,
                error: `Could not find post with slug ${slug}`
            });
        },
        "default": () => {
            res.status(404).send(`Could not find post with slug ${slug}`);
        }
    });
};
