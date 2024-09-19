require("dotenv").config();
const express = require("express");

const indexRouter = require('./routes/index.routes');
const serverConfig = require("./config/serverConfig");

const PORT = process.env.PORT ?? 3000;


const app = express(); 

//конфигурация
serverConfig(app); 
//мaршрутизация
app.use("/api", indexRouter); 

app.listen(PORT, () =>  console.log(`http://localhost:${PORT}`)); // запускаем порт