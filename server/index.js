const express = require('express');

const { PORT } = require('./Config/Config');

const app = express();

const register = require('./routes/registerRoute');
const { initTable } = require('./models/initClientDb');

app.use(express.json());
initTable();

// ! Ce petit bout sert a resoudre toutes les erreus liée au cors
// ! LA SECURITE PEUT ETRE MISE EN DEFAUT A VERIFIER EN PROD
// !------------------------------------------------------------------------
app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});
// !------------------------------------------------------------------------

app.use('/user', register);

app.get('/', (req, res) => {
  res.send('tete');
});

app.listen(PORT, () => {
  console.log(`You'r listening at port ${PORT}`);
});
