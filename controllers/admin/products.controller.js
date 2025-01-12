const Product = require('../../models/products.model')

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
// [GET] /admin/products
module.exports.index = async (req, res) => {

    let find = {
        deleted: false, 
        // title: /a/i
    };

    //filter
    const filterStatus = filterStatusHelper(req.query);
    console.log(filterStatus);

    if(req.query.status){
        find.status = req.query.status;
    }

    //search
    const objectSearch = searchHelper(req.query);
    console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    // if(req.query.keyword){
    //     find.title = new RegExp(req.query.keyword, 'i'); // Use a regular expression for case-insensitive search
    // }

    // console.log(find);

    const products = await Product.find(find);
    res.render('admin/pages/products/index', {
        pageTitle: 'DSSP',
        products: products,
        filterStatus: filterStatus
    });
}