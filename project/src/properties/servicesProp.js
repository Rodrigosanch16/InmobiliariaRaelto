const {ObjectId} = require('mongodb')

//para comunicarnos con la base de datos
const {Database} = require('../database/indexDB');

//funciones encargadas del CRUD
const COLLECTION = 'properties';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    //recibe como parametro el nombre de la collection
    return await collection.find({}).toArray();
    //find es una consulta de mongodb
    //find devuelve un iterable que se pasa a un arreglo
};
//como database es asyncrona entonces retorna una promesa
//por lo tanto se utiliza el await y se declara la funcion que la envuelve
//como async
//getAll traera todas las propiedades o inmuebles

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
    //findOne es otro metodo de consulta de mongo
    //el id sera un string y mongo requiere un object id
    //por eso se declara el ObjectId que recibira el string id

};

const create = async (property) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(property);//responde con el id en el body
    return result.insertedId;
    //otro metodo de mongo es insertOne que recibe los datos del inmueble
    //el inserta el inmueble en mongodb y devuelve un resultado
    //que lo retornamos
};

module.exports.PropertiesService = {
    getAll,
    /*Si no se le pasa clave o valor toma como clave 
    el mismo nombre getAll y como valor expondra la funcion getAll*/
    getById,
    create,
};//asi tenemos el servicio que se comunica con la DB y trae los datos
//para exponerlos al controlador