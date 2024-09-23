const validator = require("validator");
const Articulo = require("../modelos/Articulo");
const mongoose = require('mongoose');


const prueba = (rwe, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de articulos"
    });
}

const curso = (req, res) => {
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
};

const crear = async (req, res) => {

    // Recoger parámetros por POST a guardar 
    let parametros = req.body;

    // Validar los datos
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información !!");
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar",
        });
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Guardar el artículo usando async/await
    try {
        const articuloGuardado = await articulo.save();

        if (!articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo",
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Artículo guardado con éxito !!"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al guardar el artículo",
        });
    }
}

const consultarArticulos = async (req, res) => {
    try {
        // Ejecutar la consulta para obtener todos los artículos usando async/await
        let query = Articulo.find({}).sort({ fecha: -1 }); // Ordenar por fecha de creación (más recientes primero)

        // Si el parámetro 'ultimos' está presente, limitar los resultados
        if (req.params.ultimos) {
            query = query.limit(3);  // Limitar a 3 artículos si 'ultimos' está en la URL
        }

        const articulos = await query;

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos en la base de datos",
            });
        }

        return res.status(200).json({
            status: "success",
            parametro: req.params.ultimos,  // Muestra si el parámetro 'ultimos' fue usado
            contador: articulos.length,
            articulos
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los artículos"
        });
    }
}

const unArticulo = async (req, res) => {
    // Recoger el id de la URL
    let id = req.params.id;

    // Validar que el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "error",
            mensaje: "ID no válido",
        });
    }

    try {
        // Buscar el artículo en la base de datos
        const articulo = await Articulo.findById(id);

        // Si el artículo no existe, devolver error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo",
            });
        }

        // Devolver el artículo si se encuentra
        return res.status(200).json({
            status: "success",
            articulo
        });
    } catch (error) {
        // Manejo de cualquier otro error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo",
        });
    }
}

const borrar = async (req, res) => {
    let articulo_id = req.params.id;

    // Validar que el ID es válido
    if (!mongoose.Types.ObjectId.isValid(articulo_id)) {
        return res.status(400).json({
            status: "error",
            mensaje: "ID no válido",
        });
    }

    try {
        const articuloBorrado = await Articulo.findOneAndDelete({ _id: articulo_id });

        if (!articuloBorrado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo para borrar",
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            mensaje: "Artículo eliminado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al intentar borrar el artículo"
        });
    }
}

module.exports = {
    prueba,
    curso,
    crear,
    consultarArticulos,
    unArticulo,
    borrar
}
