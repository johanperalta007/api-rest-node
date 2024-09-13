const prueba = (rwe, res) => {

    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de articulos"
    });
}

const curso = (req, res)=>{
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

module.exports ={
    prueba,
    curso
}