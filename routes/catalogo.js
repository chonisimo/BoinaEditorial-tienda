const express = require('express');
const catalogoRouter = express.Router();
const sqlite = require('sqlite3');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

catalogoRouter.param('librosId', (req, res, next, librosId) => {
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

//Muestra la pagina con todo el catalogo
catalogoRouter.get('/', (req, res, next) => {
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
catalogoRouter.get('/buscador', (req, res, next) => {
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
catalogoRouter.get('/libro/:librosId', (req, res, next) => {
    db.get('SELECT * FROM Libros WHERE Libros.id = $librosId', {$librosId: req.params.librosId}, (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render(`catalogo/libro`, {libros: libros}); 
        }
    });
});

//creating one
/*catalogoRouter.post('/', (req, res, next) => {
    const codigo = req.body.libros.codigo;
    const titulo = req.body.libros.titulo;
    const tapa = req.body.libros.tapa;
    const descripcion = req.body.libros.descripcion;
    const autor = req.body.libros.autor;
    const tipo = req.body.libros.tipo;
    const tamaño = req.body.libros.tamaño;
    const precio = req.body.libros.precio;
    const stock = req.body.libros.stock;
    if (!codigo || !titulo || !tapa || !descripcion || !autor || !tipo || !tamaño || !precio || !stock) {
       return res.sendStatus(400); 
    }

    const sql = "INSERT INTO Libros (codigo, titulo, tapa, descripcion, autor, tipo, tamaño, " +
    "precio, stock) VALUES ($codigo, $titulo, $tapa, $descripcion, $autor, $tipo, $tamaño, $precio, $stock)";
    const values = {
        $codigo: codigo,
        $titulo: titulo,
        $tapa: tapa,
        $descripcion: descripcion,
        $autor: autor,
        $tipo: tipo,
        $tamaño: tamaño,
        $precio: precio,
        $stock: stock
    };

    db.run(sql, values, function(error) {
        if(error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Libros WHERE Libros.id = ${this.lastID}`, 
            (error, libros) => {
                res.status(201).json({libros: libros});
            });
        }
    });
});*/

//updating one
/*catalogoRouter.patch('/:librosId', (req, res) => {
    const codigo = req.body.libros.codigo;
    const titulo = req.body.libros.titulo;
    const tapa = req.body.libros.tapa;
    const descripcion = req.body.libros.descripcion;
    const autor = req.body.libros.autor;
    const tipo = req.body.libros.tipo;
    const tamaño = req.body.libros.tamaño;
    const precio = req.body.libros.precio;
    const stock = req.body.libros.stock;
    if (!codigo || !titulo || !tapa || !descripcion || !autor || !tipo || !tamaño || !precio || !stock) {
        return res.sendStatus(400); 
     };

     const sql = 'UPDATE Libros SET codigo = $codigo, titulo = $titulo, tapa = $tapa, descripcion = $descripcion, ' +
     'autor = $autor, tipo = $tipo, tamaño = $tamaño, precio = $precio, stock = $stock WHERE ' +
     'Libros.id = $librosId';
     const values = {
        $codigo: codigo,
        $titulo: titulo,
        $tapa: tapa,
        $descripcion: descripcion,
        $autor: autor,
        $tipo: tipo,
        $tamaño: tamaño,
        $precio: precio,
        $stock: stock,
        $librosId: req.params.id
     };
     db.run(sql, values, (error) => {
         if(error) {
             next(error);
         } else {
             db.get(`SELECT * FROM Libros WHERE Libros.id = ${req.params.id}`,
             (error, libros) => {
                res.status(200).json({libros: libros});
             })
         }
     })
});*/

//deleting one
/*catalogoRouter.delete('/:librosId', (req, res) => {
    const sql = "DELETE FROM Libros WHERE Libros.id = $librosId";
    const values = {$librosId: req.params.id};
    db.run(sql, values, (error) => {
        if(error) {
            next(error);
        } else {
            res.sendStatus(204);
        }
    });
});*/

module.exports = catalogoRouter;