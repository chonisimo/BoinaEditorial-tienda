const express = require('express');
const carritoRouter = express.Router();
const sqlite = require('sqlite3');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

carritoRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('carrito/carrito', {libros: libros.map(libro => {
                return libro;
            })});
        }
    });
});

carritoRouter.post('/', (req, res, next) => {
    const tapa = req.body.libros.tapa;
    const titulo = req.body.libros.titulo;
    const precio = req.body.libros.precio;
    db.get('SELECT * FROM Libros WHERE Libros.id = $librosId', {$librosId: req.body.libros.id}, (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.send({libros: libros});
        }
    });
});

module.exports = carritoRouter;