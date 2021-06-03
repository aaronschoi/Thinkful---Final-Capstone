const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

// app.listen(PORT, listener);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
};