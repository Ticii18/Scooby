const mysql2 = require("mysql2/promise");

const newConex = async () => {
    try {
        const conex = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            database: "hogaranimales"
        });
        console.log("Conexión exitosa");
        return conex;
    } catch (error) {
        throw error;
    }
}

newConex()
    .then(connection => {
        // Hacer algo con la conexión
        connection.end();
    })
    .catch(error => {
        console.error("Error en la conexión:", error);
    });

module.exports ={
    newConex
}