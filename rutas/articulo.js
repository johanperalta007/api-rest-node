const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

//Ruta de pruebas
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);



module.exports = router;