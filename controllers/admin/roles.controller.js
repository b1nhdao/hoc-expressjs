const systemConfig = require('../../config/system');
const Role = require('../../models/roles.model');

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await Role.find(find);

    res.render('admin/pages/roles/index', {
        pageTitle: 'Nhom quyen',
        records: records,
    });
}

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render('admin/pages/roles/create', {
        pageTitle: 'Tao moi quyen',
    });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    console.log(req.body);
    const record = new Role(req.body);
    await record.save();
    res.redirect('back');
}

// [GET] /admin/edit/:id
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Role.findOne({_id: id});
        console.log(data);
        res.render('admin/pages/roles/edit', {
            pageTitle: 'Sua nhom quyen',
            data: data,
            } 
        )
    }
    catch(error) {
        res.redirect('back');
    }
}

module.exports.editPatch = async (req, res) => {
    try{
        await Role.updateOne({_id: req.params.id}, req.body)
        req.flash('success', 'Cap nhat nhom quyen thanh cong');
    }
    catch(error){
        req.flash('error', 'Dit me may !');
    }
    res.redirect('back');
}