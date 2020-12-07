const express = require('express');
const indexRouter = express.Router();
const sqlite = require('sqlite3');
const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

let carro = [];

indexRouter.param('librosId', (req, res, next, librosId) => {
    const sql = 'SELECT * FROM Libros WHERE Libros.id = $librosId';
    const values = {$librosId: librosId};
    db.get(sql, values, (err, libros) => {
        if(err) {
            next(err);
        } else if (libros) {
            req.libros = libros;
            next();
        } else {
            res.sendStatus(404);
        }
    })
});

//Muestra la pagina de index
indexRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('index', {libros: libros.map(libro => {
                return libro;
            }), carro: carro.length});
        }
    });
});

//Muestra la pagina del carrito
indexRouter.get('/carrito', (req, res, next) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('carrito/carrito', {libros: carro || libros, carro: carro.length});
        }
})});

//agrega libro al carrito en su array carro
indexRouter.post('/carrito', (req, res, next) => {
    const identificacion = req.body.identificacion;
    db.get('SELECT * FROM Libros WHERE Libros.id = $librosId', {$librosId: identificacion}, (err, libros) => {
        if(err) {
            next(err);
        } else {
            carro.push(libros);
            res.render('catalogo/libro', {libros: libros, carro: carro.length});
        }
    });
});

//Muestra la pagina con todo el catalogo
indexRouter.get('/catalogo', (req, res, next) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('catalogo/catalogo', {libros: libros.map(libro => {
                return libro;
            }), carro: carro.length})
        }
    });
});

//Muestra los libros buscados
indexRouter.get('/catalogo/buscador', (req, res, next) => {
    db.all(`SELECT * FROM Libros WHERE lower(Libros.titulo) LIKE "%${req.query.nombre}%"`, (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render(`catalogo/buscador`, {libros: libros.map(libro => {
                return libro
            }), carro: carro.length}); 
        }
    })
});

//muestra la planilla del libro por ID
indexRouter.get('/catalogo/libro/:librosId', (req, res, next) => {
    db.get('SELECT * FROM Libros WHERE Libros.id = $librosId', {$librosId: req.params.librosId}, (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render(`catalogo/libro`, {libros: libros, carro: carro.length}); 
        }
    });
});

//El aviso de compra realizada
indexRouter.get('/carrito/compra', (req, res, next) => {
    do {
        carro.pop()
    } while (carro.length > 0);
    res.render('carrito/compra', {carro: carro.length});
});

module.exports = indexRouter;