//MODULO USERS CONTROLADOR PARA FUNCIONES CONTROLADORAS
const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const {UsersService} = require('./servicesUsers');
const {Response} = require('../common/response');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try{
            let users = await UsersService.getAll();
            Response.success(res, 200, "Lista de usuarios", users);//respeusta exitosa 
        }catch(error){
            debug(error);
            Response.error(res);//respuesta error
        }
    },
    getUser: async (req, res) => {
        try {
            const { params : {id}, } = req;//del req obtengo params y de params el id
            let user = await UsersService.getById(id);
            if(!user) {//si no existe un usuario responde con el error
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Usuario ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try{
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { params : {id}, } = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            }else{
                const updatedId = await UsersService.update(id, body);
                Response.success(res, 200, 'Usuario actualizado correctamente', "id: " + updatedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    delUser: async (req, res) => {
        try {
            const { params : {id}, } = req;
            const delUserById = await UsersService.delById(id);
            if (!delUserById) {
                Response.error(res, new createError.BadRequest());
            }else{
                Response.success(res, 200, 'Usuario eliminado correctamente', "id eliminado: " + delUserById);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
};