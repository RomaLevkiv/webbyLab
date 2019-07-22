const should = require('should');
const request = require('supertest-promised');
const app = require('../app');
const FilmModel = require('./film.model');

describe("films controller", function () {
  let server;
  let film1;

  before(async () => {
    server = await app.init();
  });

  beforeEach(async () => {
    film1 = await FilmModel.create({
      name: 'film_name1',
      yearRelease: 1996,
      encodingFormat: 'DVD',
      actorList: ['Test Actor1'],
    });
    await FilmModel.create({
      name: 'film_name2',
      yearRelease: 1997,
      encodingFormat: 'DVD',
      actorList: ['Test Actor2'],
    });
    await FilmModel.create({
      name: 'film_name3',
      yearRelease: 1998,
      encodingFormat: 'DVD',
      actorList: ['Test Actor3'],
    });
  });

  afterEach(async () => {
    await app.clearMongoDb();
  });

  it("Add new film to db", async () => {
    const responseBody = await request(server)
      .post('/films')
      .set('Content-Type', 'application/json')
      .send({
        name: 'new_film_name',
        yearRelease: 1996,
        encodingFormat: 'DVD',
        actorList: 'Bradley Cooper, Test Actor',
      })
      .expect(201)
      .end()
      .get('body')
      ;

    const newFilm = await FilmModel.findOne({ name: 'new_film_name' });
    should.exist(newFilm);
    responseBody.name.should.be.eql(newFilm.name);
  });

  it("Should get available films", async () => {
    const responseBody = await request(server)
      .get('/films')
      .send()
      .expect(200)
      .end()
      .get('body')
      ;

    responseBody.should.be.Array();
    responseBody.length.should.be.eql(3);
  });

  it("Should update film", async () => {
    const requestBody = {
      id: film1._id,
      name: 'newFilmName',
      yearRelease: 2000,
      encodingFormat: 'CD',
      actorList: 'New Actor',
    };

    await request(server)
      .put('/films')
      .set('Content-Type', 'application/json')
      .send(requestBody)
      .expect(200)
      .end()
      ;

    const updatedFilm = await FilmModel.findOne({ _id: requestBody.id });
    Object.keys(requestBody)
      .filter(key => !['id', 'actorList'].includes(key))
      .forEach(field => {
        updatedFilm[field].should.be.eql(requestBody[field]);
      });
  });

  it("Should return films by actor", async () => {
    const responseBody = await request(server)
      .get(`/films/actors/${encodeURIComponent('Test Actor1')}`)
      .send()
      .expect(200)
      .end()
      .get('body')
      ;

    responseBody.should.be.Array();
    responseBody.length.should.be.eql(1);
  });

  it("Should return films by title", async () => {
    const responseBody = await request(server)
      .get('/films/title/film_name1')
      .send()
      .expect(200)
      .end()
      .get('body')
      ;

    responseBody.should.be.Array();
    responseBody.length.should.be.eql(1);
  });

  it("Should return film by id", async () => {
    const responseBody = await request(server)
      .get(`/films/${film1._id}`)
      .send()
      .expect(200)
      .end()
      .get('body')
      ;

    const film = responseBody[0];
    should.exist(film);
    film.name.should.be.eql(film1.name);
  });

  it("Should delete film", async () => {
    const responseBody = await request(server)
      .delete(`/films/${film1._id}`)
      .send()
      .expect(200)
      .end()
      .get('body')
      ;

    const film = responseBody;
    should.exist(film);
    film.name.should.be.eql(film1.name);
  });

});