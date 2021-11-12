const express = require('express');
const createError = require('http-errors');

const {Response} = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            products: `htpps://${req.headers.host}/api/products`,
            //el req.headers.host devuelve el host del proyecto
            users: `htpps://${req.headers.host}/api/users`
        };

        Response.success(res, 200, "API Inventario", {menu})
    });

    app.use("/", router);//conf de url inicial
    //le decimos a app que use el router en la url
};

module.exports.NotFoundAPI = (app) => {//gestiona las url no encontradas
    const router = express.Router();

    router.all("*", (req, res) => {
        Response.error(res, new createError(404, "NotFound"));
    })
    //cualquier peticion inexistente en la app se responde con este controlador

    app.use("/", router);
};