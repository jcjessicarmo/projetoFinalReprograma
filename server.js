//  * Arquivo: server.js
//  * Descrição: (Responsavel por levantar o serviço do Node.js para executar a API atraves do express e js)
//  * Autor: Jéssica Carmo
//  * Data de Criação: 16/12/2019
//  * PROJETO FINA {REPROGRAMA} TURMA N3- BACK-END
 
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
      { useNewUrlParser: true, useMongoClient: true,
        useUnifiedTopology: true},
       (error) => {
        if(error) {
          console.error("Ocorreu um erro: ", error)
        } else {
          console.log("Conectado no mongoDB.")
        }
      }
    );
  }
connect ()

// Configuração da variável app para usar o 'bodyParser()'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a API
const port = process.env.port || 3000;

//Iniciando a Aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta "+ port);

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

//Definindo um padrão das rotas prefixadas: '/api'
app.use("/api", router);

//Rotas que terminarem com '/servicos' (servir: GET ALL & POST)
app.post("/servicos", (req, res) => {

    // 1) Método: Criar Serviço (acessar em: POST http://localhost:3000/api/servicos)
    // const postServico = ((req, res) => {
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
});
// });


// 2) Método: Selecionar Todos Servicos (acessar em: GET http://localhost:3000/api/servicos)
app.get( "/servicos", (req, res) => {
    Servico.find((error, servicos) => {
        if(error) 
            res.send('Erro ao tentar Selecionar Todos os servicos...: ' + error);

        res.json(servicos);
    });
});

//Rotas que irão terminar em '/servicos/:servico_id' (servir tanto para: GET, PUT & DELETE: id):
router.route('/servicos/:servico_id')

// 3) Método: Selecionar por Id: (acessar em: GET http://localhost:3000/api/servicos/:servico_id) 
app.get( "/servicos/:servico_id", (req, res) => {
    
    const servico_id = req.params.servico_id
    //Função para poder Selecionar um determinado servico por ID - irá verificar se caso não encontrar um detemrinado
    //servico pelo id... retorna uma mensagem de error:
    Servico.findById(req.params.servico_id, (error, servico) => {
        if(error)
            res.send('Id do Servico não encontrado....: ' + error);

        res.json(servico);
    });
})

// 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:3000/api/servicos/:servico_id) 
app.put( "/servicos/:servico_id", (req, res) => {

    //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Servico':
    Servico.findById(req.params.servico_id, (error, servico) => {
        if (error) 
            res.send("Id do Servico não encontrado....: " + error);

            //Segundo: 
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

            //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
            servico.save((error) => {
                if(error)
                    res.send('Erro ao atualizar o servico....: ' + error);

                res.json({ message: 'Servico atualizado com sucesso!' });
            });
        });
    })

    // 5) Método: Excluir por Id (acessar: http://localhost:3000/api/servicos/:servico_id)
    app.delete("/servicos/:servico_id", (req, res) => {
        
        Servico.remove({
            _id: req.params.servico_id
            }, (error) => {
                if (error) 
                    res.send("Id do Servico não encontrado....: " + error);

                res.json({ message: 'Servico Excluído com Sucesso!' });
            });
        });
