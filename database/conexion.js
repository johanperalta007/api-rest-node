const mongoose = require("mongoose"); // Imgrese a node_modules para poder recoger su dependencia


// Las funciones asincornas otorgan un poco de tiempo para evitar caidas y si pasa algún fallo se reporta, es bastante util para validar errores
const conexion = async() =>{

    try{

        await mongoose.connect("mongodb://localhost:27017/mi_blog");

        //Parametros dentro de un objeto // Solo en caso de fallo
        //useNewUrlParser: True
        //useUnifiedTopology: True
        //useCreateIndex: True

        console.log("Conectado correctamente a la base de datos de mi Blog JP DATA SYSTEMS");


    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports={
    conexion
}