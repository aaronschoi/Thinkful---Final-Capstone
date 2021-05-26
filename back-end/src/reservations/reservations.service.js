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

const update = (updatedReservation) => {
    const { reservation_id } = updatedReservation;
    return knex('reservations')
    .select('*')
    .where({ reservation_id })
    .update(updatedReservation, '*')
};

const destroy = () => {
    return null;
};

const list = (reservation_date) => {
    return knex("reservations")
    .where({reservation_date})
    //.where("status", ["finished", "cancelled"])
    .orderBy( "reservation_time" )
};

//issue #4
const listByDate = reservation_date => {
    return knex('reservations')
    .orderBy( 'reservation_time' )
    .where("reservation_date", reservation_date)
    .where("status", ["finished", "cancelled"])
    //.select('*')
    //.orderBy( 'reservation_time' )
    //.where({ status :  })
};

const search = mobile_number => {
    return knex("reservations")
        .select('*')
        .orderBy("reservation_date")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
  }

module.exports = {
    create,
    read,
    update,
    destroy,
    list,
    listByDate,
    search
};