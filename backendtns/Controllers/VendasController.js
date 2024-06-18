// Controllers/VendasController.js
const VendaModel = require('../Models/VendasModel');

async function inserirVenda(req, res) {
  try {
    const vendaId = await VendaModel.inserirVenda(req.body);
    res.status(200).json({ vendaId });
  } catch (err) {
    console.error('Erro ao inserir venda:', err);
    res.status(500).send('Erro ao inserir venda');
  }
}

async function listarVendaPorId(req, res) {
  try {
    const venda = await VendaModel.listarVendaPorId(req.params.id); // Passa o ID via req.params.id
    if (!venda) {
      res.status(404).send('Venda não encontrada');
      return;
    }
    res.status(200).json(venda);
  } catch (err) {
    console.error('Erro ao buscar venda por ID:', err);
    res.status(500).send('Erro ao buscar venda por ID');
  }
}

async function listarVendas(req, res) {
  try {
    const vendas = await VendaModel.listarVendas();
    res.status(200).json(vendas);
  } catch (err) {
    console.error('Erro ao listar vendas:', err);
    res.status(500).send('Erro ao listar vendas');
  }
}

async function editarVenda(req, res) {
    try {
      const result = await VendaModel.editarVenda(req.params.id, req.body); // Passa o ID via req.params.id e os dados via req.body
      res.status(200).json({ rowsAffected: result });
    } catch (err) {
      console.error('Erro ao editar venda:', err);
      res.status(500).send('Erro ao editar venda');
    }
  }

async function deletarVenda(req, res) {
  try {
    const result = await VendaModel.deletarVenda(req.params.id);
    res.status(200).json({ rowsAffected: result });
  } catch (err) {
    console.error('Erro ao deletar venda:', err);
    res.status(500).send('Erro ao deletar venda');
  }
}

module.exports = { inserirVenda, listarVendas, editarVenda, deletarVenda, listarVendaPorId };
