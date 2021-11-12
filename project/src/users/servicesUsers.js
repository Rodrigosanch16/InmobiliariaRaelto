const {ObjectId} = require('mongodb')

//para comunicarnos con la base de datos
const {Database} = require('../database/indexDB');

//funciones encargadas del CRUD
const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
};

const create = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
};

const update = async (id, body) => {
    const collection = await Database(COLLECTION);
    let resultUpdt = await collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: {
        userName: body.userName,
        email: body.email,
    }});
    return resultUpdt.value._id;
};

const delById = async (id) => {
    const collection = await Database(COLLECTION);
    let resultDel = await collection.findOneAndDelete({_id: ObjectId(id)});
    return resultDel.value._id;
};

module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    delById,
};