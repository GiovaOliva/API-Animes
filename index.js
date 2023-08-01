const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const dataPath = 'anime.json';

// Ruta principal
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Consolidada 6 - API de Animes</title>
    </head>
    <body>
      <h1>API de Animes - Rutas Disponibles</h1>
      <ul>
        <li><a href="/animes">GET /animes</a> - Obtener todos los animes.</li>
        <li><a href="/animes/:id">GET /animes/:id</a> - Obtener un anime por ID.</li>
        <li><a href="/animes/nombre/:nombre">GET /animes/nombre/:nombre</a> - Obtener un anime por nombre.</li>
        <li><a href="/animes">POST /animes</a> - Crear un nuevo anime.</li>
        <li><a href="/animes/:id">PUT /animes/:id</a> - Actualizar un anime por ID.</li>
        <li><a href="/animes/:id">DELETE /animes/:id</a> - Eliminar un anime por ID.</li>
      </ul>
    </body>
    </html>
  `;
  res.send(html);
});


// Leer todos los datos
app.get('/animes', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los datos');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Leer un anime por ID
app.get('/animes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los datos');
    } else {
      const animes = JSON.parse(data);
      const anime = animes[id];
      if (anime) {
        res.json(anime);
      } else {
        res.status(404).send('Anime no encontrado');
      }
    }
  });
});

// Leer un anime por nombre
//nombres con espacio incluir %20 ej: dragon%20ball
app.get('/animes/nombre/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los datos');
    } else {
      const animes = JSON.parse(data);
      const anime = Object.values(animes).find(
        (a) => a.nombre.toLowerCase() === nombre.toLowerCase()
      );
      if (anime) {
        res.json(anime);
      } else {
        res.status(404).send('Anime no encontrado');
      }
    }
  });
});

// Crear un nuevo anime
app.post('/animes', (req, res) => {
  const anime = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los datos');
    } else {
      const animes = JSON.parse(data);
      const id = Object.keys(animes).length + 1;
      animes[id] = anime;
      fs.writeFile(dataPath, JSON.stringify(animes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al guardar los datos');
        } else {
          res.send('Anime creado exitosamente');
        }
      });
    }
  });
});

// Actualizar un anime por ID
app.put('/animes/:id', (req, res) => {
  const id = req.params.id;
  const anime = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los datos');
    } else {
      const animes = JSON.parse(data);
      if (animes[id]) {
        animes[id] = anime;
        fs.writeFile(dataPath, JSON.stringify(animes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al guardar los datos');
          } else {
            res.send('Anime actualizado exitosamente');
          }
        });
      } else {
        res.status(404).send('Anime no encontrado');
      }
    }
  });
});

// Eliminar un anime por ID
app.delete('/animes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los datos');
    } else {
      const animes = JSON.parse(data);
      if (animes[id]) {
        delete animes[id];
        fs.writeFile(dataPath, JSON.stringify(animes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al guardar los datos');
          } else {
            res.send('Anime eliminado exitosamente');
          }
        });
      } else {
        res.status(404).send('Anime no encontrado');
      }
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});

module.exports = app;