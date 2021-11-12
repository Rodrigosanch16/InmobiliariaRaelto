//MODULO PROPERTIES CONTROLADOR PARA FUNCIONES CONTROLADORAS
const createError = require('http-errors');
const debug = require('debug')('app:module-properties-controller');

const {PropertiesService} = require('./servicesProp');
const {Response} = require('../common/response')

module.exports.PropertiesController = {
    getProperties: async (req, res) => {
        try{
            let properties = await PropertiesService.getAll();
            Response.success(res, 200, "Lista de inmuebles", properties);//respuesta exitosa
        }catch(error){
            debug(error);
            Response.error(res);//respuesta error
        }
    }, 
    getProperty: async (req, res) => {
        try {
            const { params : {id}, } = req;//del req obtengo params y de params el id
            let property = await PropertiesService.getById(id);
            if(!property) {//si no existe un inmueble responde con el error
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Inmueble ${id}`, property);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProperty: async (req, res) => {
        try{
            const {body} = req;//declara el body y toma los valores que se ingresen desde la peticion
            if (!body || Object.keys(body).length === 0) { //condiciones en caso de no encontrar el body o no tener valores puestos para body
                Response.error(res, new createError.BadRequest());//respuesta automatizada desde common response.js
            }else{
                const insertedId = await PropertiesService.create(body);//en insertedId se guarda el return del service create
                Response.success(res, 201, 'Inmueble agregado correctamente', "id: "+insertedId);//responde con el http status y un mensaje junto con el id creado
            }
        }catch(error){
            debug(error);
            Response.error(res);//respuesta automatizada desde common response.js
        }
    },
    updateProperty: async (req, res) => {
        try {
            const { params : {id}, } = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            }else{
                const updatedId = await PropertiesService.update(id, body);
                Response.success(res, 200, 'Inmueble actualizado correctamente', "id: " + updatedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    delProperty: async (req, res) => {
        try {
            const { params : {id}, } = req;
            const delPropById = await PropertiesService.delById(id);
            if (!delPropById) {
                Response.error(res, new createError.BadRequest());
            }else{
                Response.success(res, 200, 'Inmueble eliminado correctamente', "id eliminado: " + delPropById);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
};