const express = require('express')
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/posts.js')
const utils = require('../utils.js');
const storage = require('../middlewares/storage.js');
const checkPostExists = require('../middlewares/checkPostExists.js');
const { auth } = require('../middlewares/auth.js');
const postCreation = require('../middlewares/postCreation.js');
const postErrorHandler = require('../middlewares/postErrorHandler.js');
const upload = multer({ storage });

// router.use(auth);
router.use(express.urlencoded({ extended: true }));


router.get('/', postController.index)
    .post('/create', upload.single('image'), postCreation, postController.create, postErrorHandler)
    .get('/:slug', checkPostExists, postController.show)
    .delete('/:slug', checkPostExists, postController.destroy)
    .get('/:slug/download', checkPostExists, postController.download)
    .post('/:slug/comment', checkPostExists, postController.comment)


module.exports = router;