// backend/src/app.js

const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes.js");


const app = express();
const PORT = process.env.PORT || 4000; // Permitir el uso de puerto desde la variable de entorno o el predeterminado 4000

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../Client')));

// Definir rutas
app.use("/auth", authRoutes);

// Servir el archivo index.html para todas las demás rutas
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/index.html'));
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
