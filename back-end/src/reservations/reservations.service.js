const knex = require('../db/connection');

//CRUDL
const create = () => {
    return null;
};

const read = (reservation_id) => {
    return knex('reservations')
    .select('*')
    .where({ reservation_id });
};

const update = () => {
    return null;
};

const destroy = () => {
    return null;
};

const list = () => {
    return knex('reservations')
    .select('*');
};

module.exports = {
    create,
    read,
    update,
    destroy,
    list,
}