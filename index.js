//carregar o módulo do express
//quando carregar módulos faça associado a uma constante,
// para evitar a alteração de conteúdo,
// e assim evitar erros de exibição
const express = require("express");

const app = express();

//vamos iniciar os exemplos de utilização de verbos HTTP

const bodyParser = require("body-parser");
// o módulo body-parser nos ajuda a capturar os dadosque virão
// no corpo de solicitação e realiza a sua conversão para JSON
// asssim podemos manipular os dados.

//GET
//quando o meu usuário deseja obter
//algum dado do servidor.

app.get("/dados", (req, res) => {
  res.send("Você está no verbo GET");
});

//POST
// Utilizado quando o meu usuario envia algo ao servidor
// com o intuito de cadastrar ou realizar autenticação
app.use(bodyParser.json());
app.post("/dados", (req, res) => {
  res.send(req.body);
});

//PUT
//Utilizado quando o usuario deseja realizar uma atualização
//nos dados

app.put("/dados", (req, res) => {
  res.send("Você esta no verbo PUT");
});

//DELETE
//Utilizado quando o usuario deseja apagar
//algum dado no banco de dados

app.delete("/dados", (req, res) => {
  res.send("você esta no verbo DELETE");
});

app.listen(3000);
console.log("tudo funcionando por aqui, amigo...");
