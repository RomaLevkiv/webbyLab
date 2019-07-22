const express = require('express');
const route = express.Router();
const filmController = require('./films.controller')
const multer = require('multer')
const upload = multer({ dest: 'parser/' });

route.delete('/:id', filmController.removeFilmById);

route.get('/:id', filmController.getFilmById);

route.get('/title/:title', filmController.getFilmByTitle);

route.get('/actors/:actor', filmController.getFilmsByActor);

route.get('/', filmController.getFilmSort);

route.post('/', filmController.createFilmInfo);

route.put('/', filmController.updateFilm);

route.post('/addFiles', upload.single('avatar'), filmController.readFileWriteDB);


module.exports = route;