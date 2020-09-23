const express = require('express');
const server = express();

//GET

//request: o que vem da requisição
//response: resposta para o cliente

//Query Params: const nome = request.query.nome;
server.get('/hello', (request, response) => {
  const { nome, idade } = request.query;

  return response.json({
    title: 'Hello World',
    body: `Nome da requisição: ${nome} (${idade} anos)`,
  });
});

//Route Params: não é usual neste método passar mais de 1 parâmetro
server.get('/hello/:nome/:idade', (request, response) => {
  const { nome, idade } = request.params;

  return response.json({
    title: 'Hello World',
    body: `Nome da requisição: ${nome} (${idade} anos de idade).`,
  });
});

server.listen(3000);
