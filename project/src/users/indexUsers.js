//MODULO DE USERS
const express = require('express');

const { UsersController } = require('./controllerUsers');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
        .get('/', UsersController.getUsers)
        .get('/:id', UsersController.getUser)
        .post('/', UsersController.createUser)
        .put('/:id', UsersController.updateUser)
        .delete('/:id', UsersController.delUser)

    app.use('/api/users', router)
};