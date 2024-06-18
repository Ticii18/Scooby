const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use("/auth", authRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
