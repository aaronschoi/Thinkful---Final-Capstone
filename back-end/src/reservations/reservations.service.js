const knex = require("../db/connection");

//CRUDL
const create = (newReservation) => {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((createdReservations) => createdReservations[0]);
};

const read = (reservation_id) => {
  return knex("reservations").where({ reservation_id }).first();
};

const update = async (updatedReservation) => {
  const { reservation_id } = updatedReservation;
  await knex("reservations")
    .where({ reservation_id })
    .update(updatedReservation, "*");

  return read(reservation_id);
};

const destroy = () => {
  return null;
};

const list = (reservation_date) => {
  if (reservation_date) {
    return knex("reservations")
      .where({ reservation_date, status: "booked" })
      .orWhere({ reservation_date, status: "seated" })
      .orderBy("reservation_time");
  } //issue #4
};

const search = (mobile_number) => {
  return knex("reservations")
    .select("*")
    .orderBy("reservation_date")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    );
};

module.exports = {
  create,
  read,
  update,
  destroy,
  list,
  search,
};
