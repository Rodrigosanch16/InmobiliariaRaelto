//dotenv nos va a ayudar a traer las variables del archivo .env
require('dotenv').config();
//centralizamos aqui todas las variables de entorno

//los archivos seran pequenos modulos
module.exports.Config = {//.Config es la clave de la propiedad
    //el objeto va a tener las variables de entorno
    port: process.env.PORT,
    //de esta forma traemos los datos del .env a index.js
    //gracias al paquete dotenv
    //y podremos importarlos desde otros archivos
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DBNAME,
}