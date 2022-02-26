const express = require('express');
const app = express();
const userRouter = require('./routes/auth')

// para chamar a conexão com o banco de dados
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// iniciando o projeto chamando o express 

// configurando o express para aceitar arquivos json
app.use(express.json());

//rotas da api
app.use("/auth",userRouter);

//configuracao do arquivo env
dotenv.config();

//conectando com o banco de dados
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
    
}).then(console.log("Conectado com o Mongo")).catch((err)=>console.log(err));

//


//chamando o listen, e passando a porta para ele 
app.listen("3000", ()=>{
    console.log("Api is Running")
});

