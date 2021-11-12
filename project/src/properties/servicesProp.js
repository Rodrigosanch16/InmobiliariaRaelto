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
    console.log(result);
    return result.insertedId;//insertedId es la forma en que toma el id creado para llevarlo al controller
    //otro metodo de mongo es insertOne que recibe los datos del inmueble
    //el inserta el inmueble en mongodb y devuelve un resultado
    //que lo retornamos
};

const update = async (id, body) => {//recibirá el id y el body para las operaciones
    const collection = await Database(COLLECTION);
    let resultUpdt = await collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: {
        //findOneAndUpdate es una operacion de mongodb
        //recibe como parametros primero filtro u comparacion para busqueda, en este caso el id
        //y como segundo paramtro recibe los cambios a realizar
        title: body.title,
        description: body.description,
        type: body.type,
        city: body.city,
        zone: body.zone,
        number_rooms: body.number_rooms,
        number_bathrooms: body.number_bathrooms,
    }});
    return resultUpdt.value._id;//retorna del valor dado en findOneAndUpdate el id
};

const delById = async (id) => {
    const collection = await Database(COLLECTION);
    let resultDel = await collection.findOneAndDelete({_id: ObjectId(id)});
    return resultDel.value._id;//retorna el id que fue eliminado, el valor se utiliza en el controlador delProperty
    //findOneAndDelete es otra operacion de mongodb, primer parametro es el filtro para identificar qué borrar
    //en este caso se utiliza el id
}

module.exports.PropertiesService = {
    getAll,
    /*Si no se le pasa clave o valor toma como clave 
    el mismo nombre getAll y como valor expondra la funcion getAll*/
    getById,
    create,
    update,
    delById,
};//asi tenemos el servicio que se comunica con la DB y trae los datos
//para exponerlos al controlador