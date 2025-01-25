const ProductCategory = require("../../models/product-category.model")

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

const systemConfig = require('../../config/system');

const createTreeHelper = require('../../helpers/createTree');

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    
    let find = {
        deleted: false,
    };

    // Filter 

    // End Filter

    // Search
    const objectSearch = searchHelper(req.query);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    // End Search

    // Pagination
    const countRecords = await ProductCategory.countDocuments((find));

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItem: 4
    }, req.query, countRecords);

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    // itemYouWant = (currentPage - 1) * itemsOnOnePage
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    
    // End Pagination

    // Sort items
    let sort = {};
    
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue; 
    }
    else{
        sort.position = 'desc';
    }
    // End sort items




    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products-category/index.pug',{
        records: newRecords,
        pagination: objectPagination,
        keyword: objectSearch.keyword
        }
    )
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false,
    }

    // function createTree(arr, parentId = ""){
    //     const tree = [];
    //     arr.forEach(item => {
    //         if(item.parent_id == parentId){
    //             const newItem = item;
    //             const children = createTree(arr, item.id);
    //             if(children.length > 0){
    //                 newItem.children = children;
    //             }
    //             tree.push(newItem);
    //         }
    //     });
    //     return tree;
    // }

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products-category/create.pug',{
        pageTitle: "Tao danh muc san pham",
        records: newRecords,
        }
    )

}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position == ''){
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }

    // console.log(req.body);
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category/`)
}