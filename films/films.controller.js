const Film = require('./film.model');
const parsData = require('../parser/pars');

exports.createFilmInfo = async (req, res) => {
  try {
    let line = req.body.actorList;
    const arrList = line.split(', ' || ',');
    const savedFilm = await Film.create(new Film({
      name: req.body.name,
      yearRelease: +req.body.yearRelease,
      encodingFormat: req.body.encodingFormat,
      actorList: arrList
    }));
    return res.status(201).send(savedFilm);
  
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

exports.removeFilmById = async (req, res) => {
  try {
    const removedFilm = await Film.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(removedFilm);
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

exports.getFilmById = async (req, res) => {
  try {
    const gotFilm = await Film.find({ _id: req.params.id });
    res.status(200).send(gotFilm)
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

exports.getFilmSort = async (req, res) => {
  try {
    const gotFilmSorted = await Film.find({})
      .sort({ name: 'ascending' });
    
    return res.status(200).send(gotFilmSorted);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
}

exports.getFilmByTitle = async (req, res) => {
  try {
    const gotFilmByTitle = await Film.find({
      name: new RegExp(_escapeRegexpSpecialChars(req.params.title), "i") 
    });
    res.status(200).send(gotFilmByTitle);
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

exports.getFilmsByActor = async (req, res) => {
  try {
    const gotFilmByActor = await Film.find({
      actorList: { 
        $in: new RegExp(_escapeRegexpSpecialChars(req.params.actor), "i")
      } 
    });
    res.status(200).send(gotFilmByActor);
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

exports.updateFilm = async (req, res) => {
  try {
    let line = req.body.actorList;
    const arrList = line.split(', ' || ',');
    const updatedFilm = await Film.findOneAndUpdate({ _id: req.body.id }, {
      _id: req.body.id,
      name: req.body.name,
      yearRelease: +req.body.yearRelease,
      encodingFormat: req.body.encodingFormat,
      actorList: arrList
    }, {new: true});
    res.status(200).send(updatedFilm);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
}

exports.readFileWriteDB = async (req, res) => {
  try {
    const firstAction = await parsData.funcPars(req.file.filename);
    await Film.create(firstAction);
    res.status(201).send("Files have added to Data Base");
  }
  catch (e) {
    res.status(400).send("Sorry, data parsing error!");
  }
}

function _escapeRegexpSpecialChars(str) {
  return str.replace(/[\.\^\$\*\+\(\)\[\{\\\|\?]/g, '\\$&');
}
