const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const path = require('path');

const indexRouter = require('./routes/index');
const catalogoRouter = require('./routes/catalogo');
const carritoRouter = require('./routes/carrito');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

db.all("SELECT * FROM Libros", (error, rows) => {
    if(error) {
        console.error(error);
    } else {
        console.log('Conectado a la Database');
    }
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/catalogo', catalogoRouter);
app.use('/carrito', carritoRouter);

app.listen(process.env.PORT || 4001, console.log('servidor andando'));