const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const statusRoute = require('./routes/status.route');
app.use('/', statusRoute);

const usersRoute = require('./routes/users.route');
app.use('/', usersRoute);
 
app.listen(3333, () => {
  console.log('Aplicação executando na porta 3333!')
})