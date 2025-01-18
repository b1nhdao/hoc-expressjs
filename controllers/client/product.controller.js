const Product = require('../../models/products.model');

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'active',
        deleted: false
    }).sort({position: "desc"});

    const newProduct = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) * 0.01).toFixed(0);
        return item;
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        products: newProduct
    });

    // console.log(newProduct);
}

// [GET] product/:slug
module.exports.detail = async (req, res) => {
    try{
        const product = await Product.findOne({slug: req.params.slug});
        res.render('client/pages/products/detail.pug', {
            pageTitle: product.title,
            product: product
        });
    }
    catch(error){
        res.send(error);
    }
} 
