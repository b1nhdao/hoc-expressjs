const express = require('express');
// multer
const multer = require('multer');
const storageMuller = require('../../helpers/storageMulter');
const upload = multer({storage: storageMuller()});
const validate = require('../../validates/admin/product.validate');

const router = express.Router();
const controller = require('../../controllers/admin/products.controller');

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.delete('/delete/:id',controller.deleteItem);

router.patch('/change-multi/', controller.changeMulti);

router.get('/create', controller.create);

router.post('/create',upload.single('thumbnail'), validate.createPost, controller.createPost);

router.get('/edit/:id', controller.edit)

router.patch('/edit/:id',upload.single('thumbnail'), validate.createPost, controller.editPatch);

router.get('/detail/:id', controller.detail);

module.exports = router;