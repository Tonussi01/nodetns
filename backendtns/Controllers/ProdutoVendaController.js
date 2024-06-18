const ProdutoVendaModel = require('../Models/ProdutoVendaModel.js');


async function inserirProdutoPorIdVenda(req, res) {
  try {
    const obj = req.body;
    const produtoVendaId = await ProdutoVendaModel.inserirProdutoPorIdVenda(obj);
    res.status(200).json({ produtoVendaId });
  } catch (err) {
    console.error('Erro ao inserir produto por ID de venda:', err);
    res.status(500).send('Erro ao inserir produto por ID de venda');
  }
}

async function listarProdutosPorIdVenda(req, res) {
  try {
    const id_venda = req.params.id_venda;
    const produtosVenda = await ProdutoVendaModel.listarProdutosVendaId(id_venda);
    res.status(200).json(produtosVenda);
  } catch (err) {
    console.error('Erro ao listar produtos vinculados a vendas:', err);
    res.status(500).send('Erro ao listar produtos vinculados a vendas');
  }
}

async function listarProdutosVendas(req, res) {
  try {
    const produtosVenda = await ProdutoVendaModel.listarProdutosVendas();
    res.status(200).json(produtosVenda);
  } catch (err) {
    console.error('Erro ao listar produtos de vendas:', err);
    res.status(500).send('Erro ao listar produtos de vendas');
  }
}

async function deletar1ProdutoVenda(req, res) {
  try {
    const id = req.params.id;
    const rowsAffected = await ProdutoVendaModel.deletar1ProdutoVenda(id);
    res.status(200).json({ rowsAffected });
  } catch (err) {
    console.error('Erro ao deletar produto vinculado a venda:', err);
    res.status(500).send('Erro ao deletar produto vinculado a venda');
  }
}

async function deletarProdutosVenda(req, res) {
  try {
    const id_venda = req.params.id_venda;
    const rowsAffected = await ProdutoVendaModel.deletarProdutosVenda(id_venda);
    res.status(200).json({ rowsAffected });
  } catch (err) {
    console.error('Erro ao deletar produtos vinculados a venda:', err);
    res.status(500).send('Erro ao deletar produtos vinculados a venda');
  }
}

module.exports = { 
  inserirProdutoPorIdVenda, 
  listarProdutosPorIdVenda, 
  listarProdutosVendas, 
  deletar1ProdutoVenda, 
  deletarProdutosVenda 
};
