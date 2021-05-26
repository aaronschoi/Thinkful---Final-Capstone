const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */

//validators
//read
const reservationIdExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  console.log(reservation_id)
  const specificReservationData = await reservationService.read(reservation_id);
  console.log(specificReservationData)
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

// issue #3
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

// issue #3
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

// issue #3
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

// issue #3
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

// issue #5 and issue #6
const reservationDateOccursInPast = (req, res, next) => {
  const { reservation_date } = req.body.data;
  const today = new Date();
  const dateString = reservation_date.split("-");
  const resDate = new Date(
    Number(dateString[0]),
    Number(dateString[1]) - 1,
    Number(dateString[2]),
    0,
    0,
    1
  );
  if (resDate > today) {
    //maybe >= if it needs to occur today too
    return next();
  } else {
    return next({
      message: "A reservation must be made for the future",
      status: 400,
    });
  }
};

const reservationOccursOnATuesday = (req, res, next) => {
  const { reservation_date } = req.body.data;
  const dateString = reservation_date.split("-");
  const resDate = new Date(
    Number(dateString[0]),
    Number(dateString[1]) - 1,
    Number(dateString[2]),
    0,
    0,
    1
  );
  if (resDate.getDay() === 2) {
    return next({
      message: "Sorry! We are closed on Tuesdays",
      status: 400,
    });
  }
  return next();
};

// issue #3
const reservationTimeExists = async (req, res, next) => {
  const { reservation_time } = req.body.data;
  const timeRegex = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
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

// issue #6
const reservationTimeIsWithinBusinessHours = async (req, res, next) => {
  const { reservation_time } = req.body.data;
  const resTimeArray = reservation_time.split(":");
  const hour = Number(resTimeArray[0]);
  const minute = Number(resTimeArray[1]);
  if (hour >= 9) {
    if (hour === 9) {
      if (minute >= 30) {
        return next();
      }
    }
    if (hour <= 21) {
      if (hour === 21) {
        if (minute <= 30) {
          return next();
        }
      }
      return next();
    }
  }
  if (hour < 9) {
    return next({
      message: "We are not open yet!",
      status: 400,
    });
  }
  return next({
    message: "Seating ends at 9:30 PM.",
    status: 400,
  });
};

// issue #3
const peopleExists = async (req, res, next) => {
  const { people } = req.body.data;
  
  if (people && Number(people) > 0) {
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
  const {first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,} = req.body.data;
  const newResData = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status: "booked",
  }
  const newReservation = await reservationService.create(newResData);
  res.status(201).json({ data: newReservation });
};

// issue #10
const read = async (req, res) => {
  res.json({ data: await res.locals.reservation });
};

const update = async (req, res) => {
  //res.locals.reservation
  const { reservation_option } = req.params;
  if(reservation_option === "seat"){
    res.json({ data: "seat" })
  }else if(reservation_option === "edit") {
    res.json({ data: "edit" })
  }else{
    next({
      message: "invalid access point",
      status: 404
    })
  }
};

const destroy = async (req, res) => {
  return null;
};

const list = async (req, res) => {
  // const date = req.query.date;
  // const mobile_number = req.query.mobile_phone;
  // if (date) {
  //   const dataByDate = await reservationService.listByDate(date);
  //   res.json({ data: dataByDate });
  // } else if (mobile_number) {
  //   const dataByPhone = await reservationService.search(mobile_number);
  //   console.log(dataByPhone)
  //   res.json({ data: dataByPhone });
  // } else {
    const data = await (req.query.mobile_number ? reservationService.search(req.query.mobile_number) : reservationService.list(req.query.date))
    res.json({
      data
    });
  // }
};

module.exports = {
  create: [
    asyncErrorBoundary(dataBodyExists),
    asyncErrorBoundary(firstNameExists),
    asyncErrorBoundary(lastNameExists),
    asyncErrorBoundary(mobileNumberExists),
    asyncErrorBoundary(reservationDateExists),
    asyncErrorBoundary(reservationDateOccursInPast),
    asyncErrorBoundary(reservationOccursOnATuesday),
    asyncErrorBoundary(reservationTimeExists),
    asyncErrorBoundary(reservationTimeIsWithinBusinessHours),
    asyncErrorBoundary(peopleExists),
    asyncErrorBoundary(create),
  ],
  //read: [asyncErrorBoundary(reservationIdExists), asyncErrorBoundary(read)],
  update: [ asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
