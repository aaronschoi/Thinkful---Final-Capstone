const knex = require('../db/connection');

//CRUDL
const create = (newTable) => {
    return knex('tables')
    .insert(newTable, "*")
    .then((createdTables) => createdTables[0])
};

const read = (table_id) => {
    return knex('tables')
    .select('*')
    .where({table_id})
};

const update = () => {
    return null;
};

const destroy = () => {
    return null;
};

//issue #9
const list = () => {
    return knex('tables')
    .select('*')
    .orderBy('table_name')
};

module.exports = {
    create,
    read,
    update,
    destroy,
    list,
};