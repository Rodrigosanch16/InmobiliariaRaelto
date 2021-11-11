//modulo de database
const { MongoClient } = require('mongodb');
//desestructura el paquete para traer solo MongoClient
//MongoClient escribiremos un cliente para conectarse al DB
const debug = require('debug')('app:module-database');

const { Config } = require('../config/indexConf');//importa la configuracion
//desde config

//este archivo se va a encargar de exportar una funcion
//que nos devuelva la DB
var connection = null;
module.exports.Database = (collection) => new Promise( async (res, rej) => {
    //el patron singleton para no generar tantas instancias de la conexion
    try{
        if(!connection){//si no existe conexion genera una
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            //va a generar una nueva conexion al server
            //cada que se ejecute el codigo
            debug('Nueva conexion realizada con MongoDB Atlas');
        }
        //si esta reutilizando una conexion existente
        debug('Esta reutilizando una conexion existente');
        //si ya existe conexion entonces
        const db = connection.db(Config.mongoDbName);
        //que debo conectarme a una DB y esa voy a almacenarla en db
        res(db.collection(collection));
        //devuelve la collection solicitada en module.exports
    }catch(error){
        rej(error);
    }
});