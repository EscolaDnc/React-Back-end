const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho para os arquivos JSON
const dataPath = path.join(__dirname, '../data', 'projects.json');
const webPath = path.join(__dirname, '../data', 'webtexts.json');

// Endpoint GET para retornar os dados do arquivo data.json
router.get('/projects', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo data.json', err);
      res.status(500).send('Erro ao ler o arquivo data.json');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint GET para retornar os dados do arquivo web.json
router.get('/webtext', (req, res) => {
  fs.readFile(webPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo web.json', err);
      res.status(500).send('Erro ao ler o arquivo web.json');
      return;
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
