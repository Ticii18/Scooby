const mysql2 = require("mysql2/promise");

const newConex = async () => {
        const conex = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            database: "backend"
        });
        return conex
   
}


module.exports ={
    newConex
}
