const reservationService = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
/**
 * List handler for reservation resources
 */


const list = async (req, res) => {
  res.json({
    data: await reservationService.list(),
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
