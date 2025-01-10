// [GET] /admin/dashboard
module.exports.dashboard = (reg, res) => {
    res.render('admin/pages/dashboard/index', {
        pageTitle: 'Trang tong quan'
    });
}