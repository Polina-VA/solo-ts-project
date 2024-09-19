// ./config/serverConfig.js
const express = require('express');
const cookieParser = require('cookie-parser')
const removeHeader = require('../middleware/removeHeader');
const path = require("path");

// прописываем мидлварки которые используем, чтобы сервер мог обрабатывать запросы от клиента 
const serverConfig = (app) => {
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(removeHeader);
    app.use(express.static(path.join(__dirname, "public"))); 

}

module.exports = serverConfig;