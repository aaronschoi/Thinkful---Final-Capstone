const knex = require('../db/connection');

//CRUDL
const create = (newTable) => {
    return knex('tables')
    .insert(newTable, '*')
    .then((createdTables) => createdTables[0]);
};

const read = (table_id) => {
    return knex('tables')
    .select('*')
    .where({table_id})
    .first();
};

//issue #11
const readRes = (reservation_id) => {
    return knex('reservations')
    .where({reservation_id})
    .first();
};

//issue #11
const readByCapacity = (capacity, table_id) => {
    return knex('tables')
    .where({capacity})
    .where({table_id});
};

const update = async (updatedTable) => {
    const {table_id} = updatedTable;
    await knex('tables')
    .where({table_id})
    .update(updatedTable, '*');

    return read(table_id)
};

const destroy = () => {
    return null;
};

//issue #9
const list = () => {
    return knex('tables')
    .select('*')
    .orderBy('table_name');
};

module.exports = {
    create,
    read,
    readRes,
    readByCapacity,
    update,
    destroy,
    list,
};