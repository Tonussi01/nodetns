// Routes/VendasRoutes.js
const express = require('express');
const router = express.Router();
const VendasController = require('../Controllers/VendasController');

// Rota para inserir uma nova venda
router.post('/vendas', VendasController.inserirVenda);

// Rota para listar todas as vendas
router.get('/vendas', VendasController.listarVendas);

// Rota para editar uma venda específica
router.put('/vendas/:id', VendasController.editarVenda);

// Rota para deletar uma venda específica
router.delete('/vendas/:id', VendasController.deletarVenda);

module.exports = router;
