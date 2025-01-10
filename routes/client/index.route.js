const productRouter = require('./product.route');
const homeRouter = require('./home.route');

module.exports = (app) => {
    // app.get('/', (reg, res) => {
    //     // res.send(`<h1>Trang chu</h1>`)
    //     res.render('client/pages/home/index.pug');
    // });
    app.use('/', homeRouter);
    app.use('/products', productRouter);
}