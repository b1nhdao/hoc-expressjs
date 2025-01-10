const Product = require('../../models/products.model');

module.exports.index = async (reg, res) => {
    const products = await Product.find({
        // status: 'active',
        // deleted: false
    });

    const newProduct = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) * 0.01).toFixed(0);
        return item;
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        products: newProduct
    });

    console.log(newProduct);
}
