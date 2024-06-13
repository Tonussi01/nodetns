// controllers/produtosController.js
const produtoModel = require('./../Models/ProdutoModel');

async function inserirProduto(req, res) {
  try {
    const result = await produtoModel.inserirProduto(req.body);
    res.status(200).json({ rowsAffected: result });
  } catch (err) {
    console.error('Erro ao inserir produto:', err);
    res.status(500).send('Erro ao inserir produto');
  }
}

async function buscarProduto(req, res) {
  try {
    const result = await produtoModel.buscarProduto(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).send('Erro ao buscar produto');
  }
}

async function listarProduto(req, res) {
  try {
    const result = await produtoModel.listarProduto();
    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).send('Erro ao listar produtos');
  }
}

async function editarProduto(req, res) {
  try {
    const result = await produtoModel.editarProduto({ ...req.body, id: req.params.id });
    res.status(200).json({ rowsAffected: result });
  } catch (err) {
    console.error('Erro ao editar produto:', err);
    res.status(500).send('Erro ao editar produto');
  }
}

async function deletarProduto(req, res) {
  try {
    const result = await produtoModel.deletarProduto({ id: req.params.id });
    res.status(200).json({ rowsAffected: result });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).send('Erro ao deletar produto');
  }
}

module.exports = { inserirProduto, buscarProduto, listarProduto, editarProduto, deletarProduto };
