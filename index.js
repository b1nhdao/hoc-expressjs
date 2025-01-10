const express = require('express'); //import thu vien vao project
const mongoose = require('mongoose');
require("dotenv").config();

const route = require('./routes/client/index.route');

const database = require('./config/database');
database.connect();

const app = express(); //goi ham`: tao ra 1 app: toan bo chuong trinh
const port = process.env.PORT;  //cong localhost

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static("public"))

//route
route(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});