const express = require('express');
const server = express();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

let customers = [
  {
    id: 1,
    name: 'Germano Automóveis',
    website: 'https://germanoautomoveis.com.br',
  },
  { id: 2, name: 'FL Condomínios', website: 'http://fl.com.br' },
  { id: 3, name: 'Aus Burger', website: 'https://ausburger.com.br' },
];

//get ALL
server.get('/customers', (request, response) => {
  return response.json(customers);
});

//get by ID
server.get('/customers/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const customer = customers.find((item) => item.id === id);
  const status = customer ? 200 : 404;

  return response.status(status).json(customer);
});

//post - CREATE
//server.post('/customers', urlencodedParser, (req, res) => { -- URL Encoded
server.post('/customers', jsonParser, (req, res) => {
  const { name, website } = req.body;
  const id = customers[customers.length - 1].id + 1;

  const newCustumer = { id, name, website };
  customers.push(newCustumer);
  return res.status(201).json(newCustumer);
});

//put - UPDATE
server.put('/customers/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, website } = req.body;

  const index = customers.findIndex((item) => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers[index] = { id, name, website };
  }

  return res.status(status).json(customers[index]);
});

//delete - DELETE
server.delete('/customers/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex((item) => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers.splice(index, 1); //remove um objeto numa posição específica, e o number pós index, demonstra quantos registros vão ser apagados após aquele.
  }

  return res.status(status).json();
});

server.listen(3000);
