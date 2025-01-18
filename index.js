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
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`))

// method override
var methodOverride = require('method-override');
app.use(methodOverride('_method'))

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

// cookie parser
var cookieParser = require('cookie-parser')

// express-session
var session = require('express-session')

// express-flash
const flash = require('express-flash');
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// App Locals Variables
const systemConfig = require('./config/system');
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//route
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});