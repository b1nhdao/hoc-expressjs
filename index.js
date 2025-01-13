const express = require('express'); //import thu vien vao project
const app = express(); //goi ham`: tao ra 1 app: toan bo chuong trinh

// mongoose
const mongoose = require('mongoose');

// env
require("dotenv").config();

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');

const database = require('./config/database');
database.connect();

const port = process.env.PORT;  //cong localhost

// views pug
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static("public"))

// method override
var methodOverride = require('method-override');
app.use(methodOverride('_method'))

// App Locals Variables
const systemConfig = require('./config/system');
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//route
route(app);
routeAdmin(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});