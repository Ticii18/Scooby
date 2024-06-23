const express = require("express");
const path = require("path");
const { subir_publicacion } = require("../controllers/subir_publi.controller");

const router = express.Router();


router.post("/", subir_publicacion);


module.exports = router;
