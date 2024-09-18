const {conexion} = require("./database/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar la app
console.log("Inicio de App de Node para Blog de JP");

//Conectar a la base de datos

conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

//Configurar el cors
app.use(cors());

//Convertir Body a Objeto js 
app.use(express.json()); // Es un Middleware, va tener los datos disponibles como onjeto javascript usable

app.use(express.urlencoded({extended: true })); // Recibe datos por x-www-form-urlencoded

//Rutas

const rutas_articulo = require("./rutas/Articulo");

app.use("/api", rutas_articulo);



//Rutas de pruebas Dummies
app.get("/probando", (req, res)=>{
    console.log("Se ha ejecutado el Enpoint probando");

    return res.status(200).json([{
        curso: "Master en NodeJS",
        autor: "Johan E. Peralta M",
        url: "JPdatasystems.es/Node"
    },
    {
        curso: "Master en NodeJS",
        autor: "Johan E. Peralta M",
        url: "JPdatasystems.es/Node"
    },
]);
});

app.get("/", (req, res)=>{

    return res.status(200).send(
        "<h1>Empezando a crear una API Rest con Node</h1>"
    );
});




//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " +puerto);
});
