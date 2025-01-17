module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        req.flash('error', 'Hay nhap tieu de san pham');
        res.redirect('back')
        return;
    }

    if(req.body.title.length < 8){
        req.flash('error', 'Hay nhap nhieu hon 8 ki tu');
        res.redirect('back');
        return;
    }

    next();
}