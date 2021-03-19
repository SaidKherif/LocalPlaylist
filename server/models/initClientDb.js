const { Pool, Client } = require('pg');

// ! LES VARIABLE DE CONNECTION DANS LES VARIABLE D'ENVIRONEMENT !!
const connectionString =
  'postgres://postgres:02032018@127.0.0.1:5432/localplaylist';
// ! -----------------------------------------------------------------

// ! TO MODIF
// clients will also use environment variables
// for connection information
/* const client = new Client()*/
const myClient = new Client({
  connectionString,
});
// ! -----------------------------------------------

myClient.connect();

// INIT TABLE OF DATABASE
const initTable = async () => {
  // * CREATE TABLE USERS IF NOT EXISTS (Launch at the server start)
  await myClient.query(
    `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    firstName varchar NOT NULL,
    lastName varchar NOT NULL,
    username varchar UNIQUE NOT NULL,
    password varchar NOT NULL,
    email varchar UNIQUE NOT NULL
  );`,
  );
  // * ------------------------------------------------------------------
};
console.log('teret' + myClient);
module.exports = {
  initTable,
  client: myClient,
};
