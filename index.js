//carregar o módulo do express
//quando carregar módulos faça associado a uma constante,
// para evitar a alteração de conteúdo,
// e assim evitar erros de exibição
const express = require("express");

const app = express();

//vamos iniciar os exemplos de utilização de verbos HTTP

const bodyParser = require("body-parser");

//para ler o arquivo de json que contem os produtos
//que deseja exibir. Nós iremos carregar o modulo de fs (file system)

const fs = require("fs");

//vamos criar uma variavel no formato de array
//que ira guardar os produtos do arquivo loja

var dadosprodutos = null;

//realizar a leitura do arquivo de texto.
//primeira parte é o nome do arquivo
//segunda parte é  encoding (tipo texto-com acento)
//terceira parte é a função de callback

fs.readFile("./loja.json", "utf-8", function (err, texto) {
  if (err) throw err;
  dadosprodutos = JSON.parse(texto);
});

// o módulo body-parser nos ajuda a capturar os dadosque virão
// no corpo de solicitação e realiza a sua conversão para JSON
// asssim podemos manipular os dados.

var layout = [
  {
    header: "LOJA DE PRODUTOS",
    navegacao: "listar,cadastrar,atualizar,deletar",
    main: "pagina do corpo",
    footer: "Av. João Paulo, 45, Vila nova - São Paulo - SP",
  },
];

//GET
//quando o meu usuário deseja obter
//algum dado do servidor.

app.get("/listar", (req, res) => {
  layout[0].main = dadosprodutos.produtos;
  res.send(layout);
});

//POST
// Utilizado quando o meu usuario envia algo ao servidor
// com o intuito de cadastrar ou realizar autenticação
app.use(bodyParser.json());
app.post("/cadastrar", (req, res) => {
  dadosprodutos.produtos.push(req.body);

  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("Dados cadastrados");
  });
});

//PUT
//Utilizado quando o usuario deseja realizar uma atualização
//nos dados

app.put("/atualizar", (req, res) => {
  var idenviado = req.body.idproduto;

  //pegar a quantidade de produtos do arquivo json
  var qtd = dadosprodutos.produtos.length;

  for (var i = 0; i < qtd; i++)
    if (idenviado == dadosprodutos.produtos[i].idproduto) {
      dadosprodutos.produtos[i].nome = req.body.nome;
      dadosprodutos.produtos[i].descricao = req.body.descricao;
      dadosprodutos.produtos[i].preco = req.body.preco;
      dadosprodutos.produtos[i].imagem = req.body.imagem;
      break;
    }

  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("Dados atualizados com sucesso");
  });
});

//DELETE
//Utilizado quando o usuario deseja apagar
//algum dado no banco de dados

app.delete("/deletar", (req, res) => {
  var idenviado = req.body.idproduto;
  var qtd = dadosprodutos.produtos.length;
  for (var i = 0; i < qtd; i++) {
    if (idenviado == dadosprodutos.produtos[i].idproduto) {
      dadosprodutos.produtos.splice(i, 1);
      break;
    }
  }
  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("Dados apagados");
  });
});

app.listen(3600);
console.log("tudo funcionando por aqui, amigo...");
