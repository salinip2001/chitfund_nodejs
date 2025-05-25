const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sarkar", //"Jayaram_Sweets", ,
  password: "masterkey",
  port: 5433,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
