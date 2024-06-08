const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let items = [];


// Endpoint GET para retornar a lista de itens
router.get('/', (req, res) => {
  res.json(items);
});

// Endpoint GET para retornar um item específico
router.get('/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item não encontrado');
  }
});

// Endpoint POST para adicionar um novo item
router.post('/', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  fs.writeFile(dataPath, JSON.stringify(items, null, 2), err => {
    if (err) {
      console.error('Erro ao escrever no arquivo JSON', err);
      res.status(500).send('Erro ao adicionar o item');
      return;
    }
    res.status(201).send('Item adicionado com sucesso');
  });
});

// Endpoint PUT para atualizar um item existente
router.put('/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const updatedItem = req.body;
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items[index] = updatedItem;
    fs.writeFile(dataPath, JSON.stringify(items, null, 2), err => {
      if (err) {
        console.error('Erro ao escrever no arquivo JSON', err);
        res.status(500).send('Erro ao atualizar o item');
        return;
      }
      res.send('Item atualizado com sucesso');
    });
  } else {
    res.status(404).send('Item não encontrado');
  }
});

// Endpoint DELETE para remover um item
router.delete('/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items.splice(index, 1);
    fs.writeFile(dataPath, JSON.stringify(items, null, 2), err => {
      if (err) {
        console.error('Erro ao escrever no arquivo JSON', err);
        res.status(500).send('Erro ao deletar o item');
        return;
      }
      res.send('Item deletado com sucesso');
    });
  } else {
    res.status(404).send('Item não encontrado');
  }
});

module.exports = router;
