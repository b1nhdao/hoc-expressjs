module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        req.flash('error', 'Hay nhap tieu de san pham');
        res.redirect('back')
        return;
    }
    
    next();
}