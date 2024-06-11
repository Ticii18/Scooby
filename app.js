const express = require("express");
const path = require("path");
const { newConex } = require("./db");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos estáticos

const PORT = 4000;

// Ruta para procesar el formulario de registro
app.post("/registro", async (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!username || !email || !password) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Consulta para insertar los datos del usuario en la base de datos
        await conex.query("INSERT INTO usuarios (nombre_usuario, email, contraseña) VALUES (?, ?, ?)", [username, email, password]);

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Redireccionar a una página de éxito o enviar una respuesta de éxito
        res.send("Registro exitoso");
    } catch (error) {
        // Manejar errores
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});



// Servir el archivo HTML principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




// Rutas para libros (tu código existente)
// app.get("/books", async (req, res) => {
//     const conex = await newConex();
//     const results = await conex.query("SELECT * FROM books");
//     res.json(results[0]);
//     conex.end();
// });

// app.put("/books/:id", async (req, res) => {
//     const conex = await newConex();
//     const id = req.params.id;
//     const { title, author } = req.body;
//     conex.query(`UPDATE books SET title = ?, author = ? WHERE id = ?`, [title, author, id]);
//     res.send("Libro actualizado");
//     conex.end();
// });

// app.delete("/books/:id", async (req, res) => {
//     const conex = await newConex();
//     const id = req.params.id;
//     conex.query(`DELETE FROM books WHERE id = ?`, [id]);
//     res.send("Libro eliminado");
//     conex.end();
// });

// app.get("/books/:id", async (req, res) => {
//     const conex = await newConex();
//     const id = req.params.id;
//     const results = await conex.query("SELECT * FROM books WHERE id = ?", [id]);
//     res.json(results[0]);
//     conex.end();
// });

// app.post("/books", async (req, res) => {
//     const conex = await newConex();
//     const { title, author } = req.body;
//     conex.query(`INSERT INTO books (title, author) VALUES (?, ?)`, [title, author]);
//     res.send("Libro creado");
//     conex.end();
// });
