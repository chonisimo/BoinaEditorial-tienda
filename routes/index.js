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
    db.all('SELECT * FROM Noticias', (err, noticias) => {
        if(err) {
            next(err);
        } else {
            res.render('index', {noticias: noticias.map(noticia => {
                return noticia;
            })})
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
            })})
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
            })}); 
        }
    })
});

//muestra la planilla del libro por ID
indexRouter.get('/catalogo/libro/:librosId', (req, res, next) => {
    db.get('SELECT * FROM Libros WHERE Libros.id = $librosId', {$librosId: req.params.librosId}, (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render(`catalogo/libro`, {libros: libros}); 
        }
    });
});

//muestra la pagina de artistas
indexRouter.get('/artistas', (req, res, next) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('artistas/artistas', {libros: libros.map(libro => {
                return libro;
            })})
        }
    });
});

//muestra la pagina de suscripciones
indexRouter.get('/suscripciones', (req, res, next) => {
    res.render('suscripciones/suscripciones');
});

//muestra la pagina de suscripciones nivel 1
indexRouter.get('/suscripciones/nivel1', (req, res, next) => {
    res.render('suscripciones/nivel1');
});

//muestra la pagina de suscripciones nivel 2
indexRouter.get('/suscripciones/nivel2', (req, res, next) => {
    res.render('suscripciones/nivel2');
});

//muestra la pagina de suscripciones nivel 3
indexRouter.get('/suscripciones/nivel3', (req, res, next) => {
    res.render('suscripciones/nivel3');
});

//muestra la pagina de suscripciones nivel 4
indexRouter.get('/suscripciones/nivel4', (req, res, next) => {
    res.render('suscripciones/nivel4');
});

//muestra la pagina de comiquerias
indexRouter.get('/comiquerias', (req, res, next) => {
    res.render('comiquerias/comiquerias');
});

//muestra la pagina de contacto
indexRouter.get('/contacto', (req, res, next) => {
    res.render('contacto/contacto');
});

//muestra la pagina de novedades
indexRouter.get('/novedades', (req, res, next) => {
    db.all('SELECT * FROM Noticias', (err, noticias) => {
        if(err) {
            next(err);
        } else {
            res.render('novedades/novedades', {noticias: noticias.map(noticia => {
                return noticia;
            })})
        }
    });
});

//muestra la pagina de la noticia especifica
indexRouter.get('/novedades/noticia/:noticiasId', (req, res, next) => {
    db.get('SELECT * FROM Noticias WHERE Noticias.id = $noticiasId', {$noticiasId: req.params.noticiasId}, (err, noticiass) => {
        if(err) {
            next(err);
        } else {
            res.render(`novedades/noticia`, {noticias: noticiass}); 
        }
    });
});

module.exports = indexRouter;