const Product = require('../../models/products.model')

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

const systemConfig = require('../../config/system');

// [GET] /admin/products
module.exports.index = async (req, res) => {

    let find = {
        deleted: false, 
    };

    //filter
    const filterStatus = filterStatusHelper(req.query);
    // console.log(filterStatus);

    if(req.query.status){
        find.status = req.query.status;
    }

    //search
    const objectSearch = searchHelper(req.query);
    // console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    // if(req.query.keyword){
    //     find.title = new RegExp(req.query.keyword, 'i'); // Use a regular expression for case-insensitive search
    // }

    // console.log(find);

    //pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItem: 4
    }, req.query, countProducts);

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    //equator for getting THE FIRST index of item you want:
    // itemYouWant = (currentPage - 1) * itemsOnOnePage
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;


    const products = await Product.find(find)
        .sort({position: 'desc'})
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    res.render('admin/pages/products/index', {
        pageTitle: 'DSSP',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

// [DELETE]:
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status})
    req.flash('success', 'Cap nhat trang thai thanh cong !')
    res.redirect('back');
    // delete:
    // await Prodcut.deleteOne(_id: id});
}

// [PATCH] /admin/prodcuts/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({_id: id});
    await Product.updateOne({_id: id}, {deleted: true, deletedAt: new Date()})
    req.flash("success", "Da xoa thanh cong san pham")
    res.redirect('back');
}

// Lam gi tiep theo? Them 1 trang thung rac, co chuc nang khoi phuc san pham da xoa

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', ');
    switch (type) {
        case 'active':
            //why? i dont know. it will takes the _id in array ids[];
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            req.flash("success", `Cap nhat trang thai thanh cong cua ${ids.length} san pham`);
            break;
        case 'inactive':
            await Product.updateMany({_id: { $in: ids }}, {status: 'inactive'});
            req.flash("success", `Cap nhat trang thai thanh cong cua ${ids.length} san pham`);
            break;
        case 'delete-all':
            await Product.updateMany({_id: { $in:ids }}, {deleted: true, deletedAt: new Date()});
            req.flash("success", `Xoa thanh cong ${ids.length} san pham`);
            break;
        case 'change-position':
            for(const item of ids){
                let [id, position] = item.split('-');
                position = parseInt(position);
                await Product.updateOne({_id: id},{position: position});
                req.flash("success", `Thay doi trang thai thanh cong`);
                break;
            }
        default:
            break;
    }
    res.redirect('back')
}

// [GET] /admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Them moi san pham"
    });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    if(!req.body.title){
        req.flash('error', 'Hay nhap tieu de san pham');
        res.redirect('back')
        return;
    }

    req.body.price = parseInt(req.body.price);
    req.body.discountPercent = parseInt(req.body.discountPercent);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }
    else{
        req.body.position = parseInt(req.body.position); 
    }

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    // console.log(req.body);
    console.log(req.file);

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {


    try{
        const find = {
            _id: req.params.id
        }
        const product = await Product.findOne(find)
        res.render('admin/pages/products/edit', {
            pageTitle: 'Chinh sua san pham',
            product: product
        });
    }
    catch(error){
        req.flash('error', 'San pham khong ton tai');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

// [PATCH] admin/products/edit/id
module.exports.editPatch = async (req, res) => {
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try{
        await Product.updateOne({_id: req.params.id}, req.body);
        req.flash('success', 'Cap nhat thanh cong');
    }
    catch(error){
        res.send('dit me may');
        req.flash('error', 'Cap nhat that bai');
    }
    // await Product.updateOne(_id = req.params.id, productFixed);
    // console.log(productFixed);
    // console.log(req.params);
    // console.log(req);
    // await Product.updateOne(req.)

    res.redirect(`back`);
}

module.exports.detail = async (req, res) => {
    // res.send('ok');
    // console.log(req.params.id);
    // console.log(productFound);

    try{
        const productFound = await Product.findOne({_id: req.params.id});
        res.render('admin/pages/products/detail.pug', {
            product: productFound,
            pageTitle: productFound.title
        });
    }
    catch(error){
        res.send(`Loi gi ko biet luon. alicia meu :D \n ${error}`)
    }
}