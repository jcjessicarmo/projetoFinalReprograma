/**
 * Arquivo: produto.js
 * Author: Jessica Carmo
 * Descrição: arquivo responsável onde trataremos o modelo da classe 'Serviço'
 * Data: 16/12/2019
 * obs.: http://mongoosejs.com/docs/schematypes.html
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;





 

 /**
 * Serviço:
 * 
 * -> Id: int
 *   servico: String,
     produto: String,
     modelo: String,
     marca: String,
     preco: Number,
     cor: String,
     descricao: String,
     dataInicio: Date,
     dataFinal: Date,
     dataEntrega: Date
 * 
 */

 const ServicoSchema = new Schema({
     servico: String,
     produto: String,
     modelo: String,
     marca: String,
     preco: Number,
     cor: String,
     descricao: String,
     dataInicio: Date,
     dataFinal: Date,
     dataEntrega: Date
 });

 module.exports = mongoose.model("Servico", ServicoSchema);