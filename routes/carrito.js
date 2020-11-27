const express = require('express');
const carritoRouter = express.Router();
const sqlite = require('sqlite3');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

let carro = [];
/*No funciona ninguna para hacer lo que quiero que es eliminar valores repetidos en array
let carroFinal = new Set();
let unica = carro.reduce(function(car, lib){
    if (car.indexOf(lib) < 0 ) car.push(lib);
    return car;
  },[]);
//No hace lo que yo quiero
/*function carroFinal(array) {
    return Array.from(new Set(array))
};*/

//Muestra views de carrito
carritoRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Libros', (err, libros) => {
        if(err) {
            next(err);
        } else {
            res.render('carrito/carrito', {libros: carro || libros});
        }
})});

//El aviso de compra realizada
carritoRouter.get('/compra', (req, res, next) => {
    res.render('carrito/compra');
})

//Suma al carrito el articulo clickeado
carritoRouter.post('/', (req, res, next) => {
    const identificacion = req.body.identificacion;
    db.get('SELECT * FROM Libros WHERE Libros.id = $librosId', {$librosId: identificacion}, (err, libros) => {
        if(err) {
            next(err);
        } else {
            carro.push(libros);
            /*for (let i = 0; i < carro.length; i++) {
                if (carro[i] === libros) {
                    carro.pop();
                } else {
                    carro.push(libros);
                }
            };*/
            //console.log(carro);  
            res.render('catalogo/libro', {libros: libros});
        }
    });
    

});

module.exports = carritoRouter;