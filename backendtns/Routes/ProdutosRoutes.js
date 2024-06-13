// routes/produtosRoute.js
const express = require('express');
const produtosController = require('../Controllers/ProdutosController.js');

const router = express.Router();

router.post('/produtos', produtosController.inserirProduto);
router.get('/produtos', produtosController.listarProduto);
router.put('/produtos/:id', produtosController.editarProduto);
router.delete('/produtos/:id', produtosController.deletarProduto);

module.exports = router;
