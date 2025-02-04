const mongoose = require("mongoose");

//mongoose slug updater
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema(
    {
        title: String,
        product_category_id:{
            type: String,
            default: ''
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug: "title", //it-gonna-be-something-like-this
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },{
        timestamps: true
    }
)
const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;