//  * Arquivo: servico.js
//  * Author: Jessica Carmo
//  * Descrição: arquivo responsável onde trataremos o modelo da classe 'Serviço'
//  * Data: 16/12/2019
//  * PROJETO FINA {REPROGRAMA} TURMA N3- BACK-END

 //Conexao MongoDB
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

//  * Serviço:
//  * -> Id: int
//      servico: String,
//      produto: String,
//      modelo: String,
//      marca: String,
//      preco: Number,
//      cor: String,
//      dataInicio: String,
//      dataFinal: String,
//      dataRetirada: String,
//      descricao: String


 const ServicoSchema = new Schema({
     servico: String,
     produto: String,
     modelo: String,
     marca: String,
     preco: Number,
     cor: String,
     dataInicio: String,
     dataFinal: String,
     dataRetirada: String,
     descricao: String
 });

 module.exports = mongoose.model("Servico", ServicoSchema);