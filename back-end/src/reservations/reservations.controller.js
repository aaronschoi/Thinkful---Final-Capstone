const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */

//validators
//read
const reservationIdExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  const specificReservationData = await reservationService.read(reservation_id);
  if (specificReservationData.length >= 1) {
    res.locals.reservation = specificReservationData;
    return next();
  } else {
    return next({
      message: `The reservation with reservation_id:${reservation_id} does not exist`,
      status: 404,
    });
  }
};

//create
// issue #3
const dataBodyExists = async (req, res, next) => {
  if (req.body.data) {
    return next();
  } else {
    return next({
      message: "Body of Data does not exist",
      status: 400,
    });
  }
};

const firstNameExists = async (req, res, next) => {
  const { first_name } = req.body.data;
  if (first_name && first_name !== "") {
    return next();
  } else {
    return next({
      message: "Body of Data must contain first_name",
      status: 400,
    });
  }
};

const lastNameExists = async (req, res, next) => {
  const { last_name } = req.body.data;
  if (last_name && last_name !== "") {
    return next();
  } else {
    return next({
      message: "Body of Data must contain last_name",
      status: 400,
    });
  }
};

const mobileNumberExists = async (req, res, next) => {
  const { mobile_number } = req.body.data;
  if (mobile_number && mobile_number !== "") {
    return next();
  } else {
    return next({
      message: "Body of Data must contain mobile_number",
      status: 400,
    });
  }
};

const reservationDateExists = async (req, res, next) => {
  const { reservation_date } = req.body.data;
  const dateRegex = new RegExp(
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  );
  if (
    reservation_date &&
    reservation_date !== "" &&
    reservation_date.match(dateRegex)
  ) {
    return next();
  } else {
    return next({
      message: "Body of Data must contain reservation_date",
      status: 400,
    });
  }
};

const reservationTimeExists = async (req, res, next) => {
  const { reservation_time } = req.body.data;
  const timeRegex = new RegExp(/^[0-2][0-3]:[0-5][0-9]$/);
  if (
    reservation_time &&
    reservation_time !== "" &&
    reservation_time.match(timeRegex)
  ) {
    return next();
  } else {
    return next({
      message: "Body of Data must contain reservation_time",
      status: 400,
    });
  }
};

const peopleExists = async (req, res, next) => {
  const { people } = req.body.data;
  if (people && typeof people === "number" && people > 0) {
    return next();
  } else {
    return next({
      message: `Body of Data must contain a number of people`,
      status: 400,
    });
  }
};

//CRUDL functions
const create = async (req, res) => {
  const reservationData = ({
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data);
  const newReservation = await reservationService.create(reservationData);
  res.status(201).json({ data: newReservation });
};

const read = async (req, res) => {
  res.json({ data: await res.locals.reservation });
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
  create: [
    asyncErrorBoundary(dataBodyExists),
    asyncErrorBoundary(firstNameExists),
    asyncErrorBoundary(lastNameExists),
    asyncErrorBoundary(mobileNumberExists),
    asyncErrorBoundary(reservationDateExists),
    asyncErrorBoundary(reservationTimeExists),
    asyncErrorBoundary(peopleExists),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationIdExists), asyncErrorBoundary(read)],
  update,
  delete: [asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
