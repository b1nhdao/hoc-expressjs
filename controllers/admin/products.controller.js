const Product = require('../../models/products.model')

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

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

// [PATCH] /admin/products/change-status/:status/:id

// [DELETE]:
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    // delete:
    // await Prodcut.deleteOne(_id: id});
    await Product.updateOne({_id: id}, {status: status})

    res.redirect('back');
}

// [PATCH] /admin/prodcuts/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({_id: id});
    await Product.updateOne({_id: id}, {deleted: true, deletedAt: new Date()})
    res.redirect('back');
}

// Lam gi tiep theo? Them 1 trang thung rac, co chuc nang khoi phuc san pham da xoa

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', ');
    console.log(type);
    console.log(ids);
    switch (type) {
        case 'active':
            //why? i dont know. it will takes the _id in array ids[];
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case 'inactive':
            await Product.updateMany({_id: { $in: ids }}, {status: 'inactive'});
            break;
    
        default:
            alert('Hay chon 1 trang thai truoc khi submit !')
            break;
    }
    res.redirect('back')
}