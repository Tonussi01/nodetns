const express = require('express');
const router = express.Router();
const ProdutoVendaController = require('../Controllers/ProdutoVendaController.js');

// Rota para inserir um produto vinculado a uma venda específica
router.post('/produtosvenda', ProdutoVendaController.inserirProdutoPorIdVenda);

// Rota para listar produtos vinculados a todas as vendas
router.get('/produtosvenda', ProdutoVendaController.listarProdutosVendas);

// Rota para listar produtos vinculados a uma venda específica por ID da venda
router.get('/produtosvenda/:id_venda', ProdutoVendaController.listarProdutosPorIdVenda);

// Rota para deletar um produto vinculado a uma venda específica por ID do produto
router.delete('/produtosvenda/:id', ProdutoVendaController.deletar1ProdutoVenda);

// Rota para deletar todos os produtos vinculados a uma venda específica por ID da venda
router.delete('/produtosvenda/:id_venda', ProdutoVendaController.deletarProdutosVenda);

module.exports = router;
