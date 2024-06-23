// db.js

const mysql = require("mysql2/promise");

const newConex = async () => {
    try {
        const conex = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "hogaranimales"
        });
        console.log("Conexión exitosa");
        return conex;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    newConex
};
