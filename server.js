/**
 * 
 * Arquivo: server.js
 * Descrição: (Responsavel por levantar o serviço do Node.js para executar a API atraves do express e js)
 * Author: Jessica Carmo
 * Data de Criação: 16/12/2019
 * 
 */

// Configurar o Setup da App
// Chamadas dos pacotes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 

const Servico = require("./app/models/servico");

//URI

mongoose.connect("mongodb+srv://Loja:<password>@cluster0-zvfy5.gcp.mongodb.net/test?retryWrites=true&w=majority") // 

//Maneira Local: MongoDB
//mongoose.connect("mongodb://localhost:27017/Loja");


// Configuração da variável app para usar o 'bodyParser()'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Definindo a porta onde será executada a API
const port = process.env.port || 3000;

// ROUTES - Colocar depois na pasta routers
var router = express.Router();

//Rota de exemplo
router.get("/", function(req, res){
    res.json ({ message: "Bem vinda(o)! a nossa Loja Felisss"})
});

//Definindo um padrão das rotas prefixadas: '/api'
app.use("/api", router);

//Iniciando a Aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta "+ port);
