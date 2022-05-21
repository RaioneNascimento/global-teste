const express = require("express");
const usersRoute = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const SECRET = 'raionetools';

usersRoute.use(bodyParser.json());

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  const index = blacklist.findIndex(item => item === token);

  if(index !== -1) return res.status(401).end();

  jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end();

    req.uuid = decoded.uuid;
    next();
  })
}

usersRoute.post('/login', (req, res) => {
  if(req.body.email === 'raione@hotmail.com' && req.body.password === 'admin') {
    const token = jwt.sign({ uuid: 1 }, SECRET, { expiresIn: 500 });
    return res.json({ 
      user: 'raione',
      email: req.body.email,
      nivel_acesso: 'admin',
      auth: true, 
      token })
  }

  res.sendStatus(401).end();
})

usersRoute.get('/users', verifyJWT, (req, res) => {
  res.json([{
    user_name: 'Raione Nascimento', 
    user_email: 'raione_bonfim@hotmail.com', 
    nivel_acesso: 'admin', 
    uuid: 1
  }]);
});

usersRoute.get('/users/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  res.status(200).send({ uuid });
});

usersRoute.delete('/users/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  res.send(`id ${uuid} deletado com sucesso`);
});

const blacklist = [];
usersRoute.post('/logout', function(req, res) {
  blacklist.push(req.headers['x-access-token']);
  res.end();
})

module.exports = usersRoute;
