const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//validation
//issue #8
const tableExists = async (req, res, next) => {
  const { table_id } = req.params;
  const data = await tableService.read(Number(table_id));
  if (data.length >= 1) {
    res.locals.table = data;
    return next();
  } else {
    return next({
      message: "The Table does not Exist",
      status: 404,
    });
  }
};

//issue #8
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

//issue #8
const tableNameExists = async (req, res, next) => {
  const { table_name } = req.body.data;
  if (table_name && table_name !== "" && table_name.length > 1) {
    return next();
  } else {
    return next({
      message: "table_name cannot be empty or one letter",
      status: 400,
    });
  }
};

//issue #8
const capacityExists = async (req, res, next) => {
  const { capacity } = req.body.data;
  if(capacity && !isNaN(capacity) && capacity > 0){
  return next();
  }
  else{
      return next({
        message: 'The table must have a capacity greater than zero',
        status: 400,
      })
  }
};

//CRUDL functions
//issue #8
const create = async (req, res) => {
    const { table_name, capacity } = req.body.data;
    const newTable = {
        table_name: table_name,
        capacity: capacity,
        status: "open"
    }
    const createdTable = await tableService.create(newTable)
    res.status(201).json({ data: createdTable })
};

//issue #8
const read = async (req, res) => {
  res.json({ data: res.locals.table })
};

const update = async (req, res) => {
  return null;
};

const destroy = async (req, res) => {
  return null;
};

//issue #9
const list = async (req, res) => {
  res.status(200).json({
    data: await tableService.list(),
  });
};

module.exports = {
  create: [
    asyncErrorBoundary(dataBodyExists),
    asyncErrorBoundary(tableNameExists),
    asyncErrorBoundary(capacityExists),
    asyncErrorBoundary(create) ],
  read: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(read),
  ],
  update,
  delete: [asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
