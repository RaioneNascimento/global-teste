const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));

const statusRoute = require('./routes/status.route');
app.use('/api', statusRoute);

const usersRoute = require('./routes/users.route');
app.use('/api', usersRoute);
 
app.listen(3333, () => {
  console.log('Aplicação executando na porta 3333!')
})