//MODULO DE INMUEBLES
const express = require('express');

const { PropertiesController } = require('./controllerProp');

const router = express.Router();
//router nos permitira manejar las rutas del modulo

module.exports.PropertiesAPI = (app) => {
    //dentro del modulo se recibe la app para configurar lo que 
    //necesita el modulo
    router
        .get('/', PropertiesController.getProperties)// http://localhost:3000/api/properties/   ejemplo //este obtiene todas las collections en la db en este caso propiedades
        .get('/:id', PropertiesController.getProperty)// http://localhost:3000/api/properties/17
        .post('/', PropertiesController.createProperty)
        .put('/:id', PropertiesController.updateProperty)
        .delete('/:id', PropertiesController.delProperty)

    app.use('/api/properties', router)//agrega las rutas en la url 
}//de esta forma configuramos las rutas