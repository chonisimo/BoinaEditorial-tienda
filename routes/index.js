const express = require('express');
const indexRouter = express.Router();
const sqlite = require('sqlite3');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

indexRouter.get('/', (req, res) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('index', {libros: libros.map(libro => {
                return libro.tapa;
            })}); // con {libros: libro[x].titulo} ya funciona, entrega la data que pretendo.
        }
    });
});

module.exports = indexRouter;