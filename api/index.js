const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Live"));

// Middleware para parsear JSON
app.use(express.json());

// Importa o roteador CRUD
const crudRouter = require('../APIs/crud');
const getRouter = require('../APIs/get');


// Usa o roteador CRUD para o endpoint /items
app.use('/playground', crudRouter);
app.use('/files', getRouter);


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;