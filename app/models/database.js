const mongoose = require('mongoose');
const MONGO_URL ="mongodb+srv://Loja:teste231@cluster0-zvfy5.gcp.mongodb.net/test?retryWrites=true&w=majority";

// function connect () {
//   mongoose.connect(MONGO_URL,
//     { useNewUrlParser: true },
//     function (error) {
//       if(error) {
//         console.error("Ocorreu um erro: ", error)
//       } else {
//         console.log("Conectado no mongoDB.")
//       }
//     }
//   );
// }

// module.exports = { connect }

const connect = () => {
    mongoose.connect(MONGO_URL, {useNewUrlParser:true, useMongoClient: true })
    const connection = mongoose.connection
    connection.on('error',() => console.error('Erro ao conectar'))
    connection.once('open', () => console.info('Conectamos'))
    }
    
    module.exports  = connect;
