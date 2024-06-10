const express  = require("express");
const app = express();
const path = require("path");
const { newConex } = require("./db");

app.use(express.json());
const PORT = 4000

// obtener los libros
app.get("/books", async (req, res) => {

    const conex = await newConex()

    const results =  await conex.query("SELECT * FROM books")

    // res.send("obtener todos los libros")
    // console.log(results);

    res.json(results[0]);
    conex.end()
})

// editar un libro especifico

app.put("/books/:id", async (req, res) => {

    const conex = await newConex()
    const id = req.params.id
    const {title, Author} = req.body 

    conex.query(`UPDATE books SET title =?, author =? WHERE id =?`, [title, Author, id])
    
    res.send("editar un book") 
    conex.end()
})

// eliminar un libro

app.delete("/books/:id", async (req, res) => {

    const conex = await newConex()
    const id = req.params.id

    conex.query(`DELETE FROM books WHERE id =?`, id)
    
    res.send("eliminar un book")
    conex.end()
})


//obtener un solo libro

app.get("/books/:id", async (req, res) => {

    const conex = await newConex()
    const id = req.params.id

    const results =  await conex.query("SELECT * FROM books WHERE id =?", id)

    // res.send("obtener todos los libros")
    // console.log(results);

    res.json(results[0]);
    conex.end()
})


//creaar un nuevo libro
app.post("/books",async (req, res) => {
    
    console.log(req.body);
    
    const conex = await newConex()
    const {title, author} = req.body 
    conex.query(`INSERT INTO books (title, author) VALUES ( ? , ? )`, [title, author])
    
    
    res.send("crear un book")
    conex.end()



})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust the path if necessary
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/index.html`));