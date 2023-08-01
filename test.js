const request = require('supertest');
const { expect } = require('chai');
const app = require('./index');

describe('Pruebas del servidor', () => {
  it('Debería obtener todos los animes correctamente', (done) => {
    request(app)
      .get('/animes')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Debería obtener un anime por ID correctamente', (done) => {
    request(app)
      .get('/animes/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.nombre).to.equal('Akira');
        done();
      });
  });

  it('Debería obtener un anime por nombre correctamente', (done) => {
    request(app)
      .get('/animes/nombre/dragon%20ball')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.nombre).to.equal('Dragon Ball');
        done();
      });
  });

  it('Debería crear un nuevo anime correctamente', (done) => {
    const nuevoAnime = {
      nombre: 'Nuevo Anime',
      genero: 'Acción',
      año: '2023',
      director: 'Giovany Oliva',
    };

    request(app)
      .post('/animes')
      .send(nuevoAnime)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Anime creado exitosamente');
        done();
      });
  });

  it('Debería actualizar un anime correctamente', (done) => {
    const animeActualizado = {
      nombre: 'Anime Actualizado',
      genero: 'Fantasía',
      año: '2022',
      directory: 'Giovaninny'
    };

    request(app)
      .put('/animes/6')
      .send(animeActualizado)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Anime actualizado exitosamente');
        done();
      });
  });

  it('Debería eliminar un anime correctamente', (done) => {
    request(app)
      .delete('/animes/6')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Anime eliminado exitosamente');
        done();
      });
  });
});