const systemConfig = require('../../config/system');

const dashboardRoute = require('./dashboard.route');
const prodcutRoute = require('./products.route');
const productsCategoryRoute = require('./products-category.route');
const rolesRoute = require('./roles.router');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/', dashboardRoute);
    app.use(PATH_ADMIN + '/products', prodcutRoute);
    app.use(PATH_ADMIN + '/products-category', productsCategoryRoute)
    app.use(PATH_ADMIN + '/roles', rolesRoute);
}