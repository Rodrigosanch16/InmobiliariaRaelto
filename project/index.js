//archivo encargado de generar el servidor
const express = require('express');
const debug = require('debug')('app:main');

const {Config} = require('./src/config/indexConf');//se importa el index de config
//de esta forma podemos acceder a las propiedades de Config
//como Config.port que usa el puerto del archivo.env
const {PropertiesAPI} = require('./src/properties/indexProp');//importo PropertiesAPI

const app = express();

app.use(express.json());//damos la capacidad al server de recibir datos
//en el body

PropertiesAPI(app);

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});