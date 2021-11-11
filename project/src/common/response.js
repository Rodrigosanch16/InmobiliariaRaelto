const createError = require('http-errors');//nos permite crear errores
//que se envian como respuesta en caso de error status code 400-500

module.exports.Response = {
    success: (res, status = 200, message = "OK", body = {}) => {
        res.status(status).json({message, body});
    },
    error: (res, error = null) => {
        const {statusCode, message} = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({message});
    },
};