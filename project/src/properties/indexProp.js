//MODULO DE INMUEBLES
const express = require('express');

const { PropertiesController } = require('./controllerProp');

const router = express.Router();
//router nos permitira manejar las rutas del modulo

module.exports.PropertiesAPI = (app) => {
    //dentro del modulo se recibe la app para configurar lo que 
    //necesita el modulo
    router
        .get('/', PropertiesController.getProperties)// http://localhost:3000/api/properties/   ejemplo
        .get('/:id', PropertiesController.getProperty)// http://localhost:3000/api/properties/17
        .post('/', PropertiesController.createProperty)
        //TODO pendiente las rutas update y delete
        /*se debe crear el controlador para c/u
        y se necesitaran los servicios para update y delete*/
        //guiarse con https://docs.mongodb.com/drivers/node/v3.6/usage-examples/

    app.use('/api/properties', router)//agrega las rutas en la url 
}//de esta forma configuramos las rutas