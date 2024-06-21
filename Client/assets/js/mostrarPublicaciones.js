const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hogaranimales'
});

// Conectar a la base de datos
connection.connect();

// Configurar la ruta para manejar la solicitud GET
app.get('/', (req, res) => {
  // Consulta SQL
  const sqlQuery = 'SELECT titulo, contenido, imagen_url FROM publicaciones';

  // Ejecutar la consulta
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al obtener datos de la base de datos');
      return;
    }
    console.log('Resultados de la consulta:', results);  // Verifica los resultados aquí

    // Renderizar la página HTML con los resultados de la consulta
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consulta de Publicaciones</title>
      </head>
      <body>
        <h1>Publicaciones</h1>
        <ul>
          ${results.map(result => `
            <li>
              <h2>${result.titulo}</h2>
              <p>${result.contenido}</p>
              ${result.imagen_url ? `<img src="${result.imagen_url}" alt="${result.titulo}" width="200">` : ''}
            </li>
          `).join('')}
        </ul>
      </body>
      </html>
    `);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
