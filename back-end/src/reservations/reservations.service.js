const knex = require('../db/connection');

//CRUDL
const create = (newReservation) => {
    return knex('reservations')
    .insert(newReservation, "*")
    .then((createdReservations) => createdReservations[0])
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