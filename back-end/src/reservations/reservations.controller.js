const reservationService = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
/**
 * List handler for reservation resources
 */

//validators
const reservationIdExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  const specificReservationData = await reservationService.read(reservation_id);
  if(specificReservationData.length >= 1){
    res.locals.reservation = specificReservationData;
    return next();
  }
  else{
    return next({
      message: `The reservation with reservation_id:${reservation_id} does not exist`,
      status: 404,
    })
  }
}

//CRUDL functions
 const create = async (req, res) => {
  return null;
};

const read = async (req, res) => {
  res.json({ data : await res.locals.reservation })
};

const update = async (req, res) => {
  return null;
};

const destroy = async (req, res) => {
  return null;
};

const list = async (req, res) => {
  res.json({
    data: await reservationService.list(),
  });
};


module.exports = {
  create,
  read : [asyncErrorBoundary(reservationIdExists), asyncErrorBoundary(read)],
  update,
  delete : [asyncErrorBoundary(destroy)],
  list : [asyncErrorBoundary(list)],
};
