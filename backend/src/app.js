const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./routes/auth.routes.js");
const tareasRoutes = require("./routes/tareas.routes.js"); // Asegúrate de que este archivo existe y está exportando un router
const publiRoutes = require("./routes/subir_publi.routes");


const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../Client')));

// Rutas
app.use("/auth", authRoutes);
app.use("/publicacion", tareasRoutes);
app.use("/subir", publiRoutes);

// Ruta para manejar todas las demás solicitudes y servir el archivo HTML principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
