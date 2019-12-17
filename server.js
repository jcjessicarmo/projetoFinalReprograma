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

//URI MongoDB Atlas
//Conexão MongoDB
const MONGO_URL = ("mongodb+srv://Loja:teste231@cluster0-zvfy5.gcp.mongodb.net/test?retryWrites=true&w=majority");
function connect () {
    mongoose.connect(MONGO_URL,
      { useNewUrlParser: true, useMongoClient: true },
      function (error) {
        if(error) {
          console.error("Ocorreu um erro: ", error)
        } else {
          console.log("Conectado no mongoDB.")
        }
      }
    );
  }
module.exports = { connect }

// Configuração da variável app para usar o 'bodyParser()'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a API
const port = process.env.port || 3000;

// =======================================================================
//ROTAS DA API
// ROUTES - Colocar depois na pasta routers
//Criando uma instância das rotas via Express:
const router = express.Router();

router.use((req, res, next) => {
    console.log("Algo está acontecendo aqui...");
    next();
});

//Rota de exemplo
router.get("/", (req, res) => {
    res.json ({ message: "Bem vinda(o)! a nossa Loja Felisss"})
});
//==========================================================================
//API'S

//Rotas que terminarem com '/servicos' (servir: GET ALL & POST)
router.post("/servicos")

    /* 1) Método: Criar Serviço (acessar em: POST http://localhost:3000/api/servicos)  */
    const postServico = ((req, res) => {
        const servico = new Servico();

        //Campos dos servicos (via request)
        servico.servico = req.body.servico;
        servico.produto = req.body.produto;
        servico.modelo = req.body.modelo;
        servico.marca = req.body.marca;
        servico.preco = req.body.preco;
        servico.cor = req.body.cor;
        servico.dataInicio = req.body.dataInicio;
        servico.dataFinal = req.body.dataFinal;
        servico.dataRetirada = req.body.dataRetirada;
        servico.descricao = req.body.descricao;

        servico.save((error) => {
        if(error){
            return res.status(500).send('Erro ao tentar salvar o Serviço...: ' + error);
        }
        return res.status(200).json({ Mensagem: 'Serviço Cadastrado com Sucesso!' });
});
})
//Definindo um padrão das rotas prefixadas: '/api'
app.use("/api", router);

//Iniciando a Aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta "+ port);
