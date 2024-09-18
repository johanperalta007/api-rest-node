const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

//Ruta de pruebas
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

// Ruta util
router.post("/crear", ArticuloControlador.crear);
router.get("/consulta/:ultimos?", ArticuloControlador.consultarArticulos);  // El signo de interrogación indica que el parametro 'ultimo?' NO es oblogatorio



module.exports = router;