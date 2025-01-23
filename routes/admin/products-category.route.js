const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/products-category.controller.js');

const multer = require('multer');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');
const upload = multer();

const validate = require('../../validates/admin/product-category.validate.js');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), uploadCloud.upload, validate.createPost, controller.createPost)

module.exports = router;