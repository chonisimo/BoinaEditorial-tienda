const express = require('express');
const carritoRouter = express.Router();
const sqlite = require('sqlite3');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

carritoRouter.post('/', (req, res, next) => {
    
})

module.exports = carritoRouter;