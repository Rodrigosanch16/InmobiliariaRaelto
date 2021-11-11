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
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await PropertiesService.create(body);
                Response.success(res, 201, 'Inmueble agregado correctamente', "id: "+insertedId);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
};