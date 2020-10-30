const express = require('express');
const indexRouter = express.Router();
const sqlite = require('sqlite3');

const db = new sqlite.Database('./BoinaEditorialLibros3.sqlite');

indexRouter.get('/', (req, res) => {
    res.render('index');
});

module.exports = indexRouter;