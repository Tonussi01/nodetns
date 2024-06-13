// models/produtoModel.js
const sql = require('mssql');
const dbConfig = require('./../Config/dbConfig');

async function inserirProduto(obj) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('nome', sql.VarChar, obj.nome)
      .input('quantidade', sql.Int, obj.quantidade)
      .input('valor_compra', sql.Float, obj.valor_compra)
      .input('valor_venda', sql.Float, obj.valor_venda)
      .input('disponivel', sql.Int, obj.disponivel)
      .input('codigo_sku', sql.VarChar, obj.codigo_sku)
      .input('fornecedor', sql.VarChar, obj.fornecedor)
      .query('INSERT INTO PRODUTOS ([nome],[quantidade],[valor_compra],[valor_venda],[disponivel],[codigo_sku],[fornecedor]) VALUES (@nome, @quantidade, @valor_compra, @valor_venda, @disponivel, @codigo_sku, @fornecedor)');
    
    return result.rowsAffected[0];
  } catch (err) {
    console.error('Erro ao inserir produto:', err);
    throw err;
  }
}

async function buscarProduto(obj) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('nome', sql.VarChar, '%' + obj.nome + '%')
      .input('codigo_sku', sql.VarChar, '%' + obj.codigo_sku + '%')
      .query('SELECT id, nome, quantidade, valor_compra, valor_venda, disponivel, codigo_sku, fornecedor FROM PRODUTOS WHERE (nome LIKE @nome) AND (codigo_sku LIKE @codigo_sku)');
    
    return result.recordset;
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    throw err;
  }
}

async function listarProduto() {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT id, nome, quantidade, valor_compra, valor_venda, disponivel, codigo_sku, fornecedor FROM PRODUTOS');
    
    return result.recordset;
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    throw err;
  }
}

async function editarProduto(obj) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('id', sql.Int, obj.id)
      .input('nome', sql.VarChar, obj.nome)
      .input('quantidade', sql.Int, obj.quantidade)
      .input('valor_compra', sql.Float, obj.valor_compra)
      .input('valor_venda', sql.Float, obj.valor_venda)
      .input('disponivel', sql.Int, obj.disponivel)
      .input('codigo_sku', sql.VarChar, obj.codigo_sku)
      .input('fornecedor', sql.VarChar, obj.fornecedor)
      .query('UPDATE PRODUTOS SET nome = @nome, quantidade = @quantidade, valor_compra = @valor_compra, valor_venda = @valor_venda, disponivel = @disponivel, codigo_sku = @codigo_sku, fornecedor = @fornecedor WHERE id = @id');
    
    return result.rowsAffected[0];
  } catch (err) {
    console.error('Erro ao editar produto:', err);
    throw err;
  }
}

async function deletarProduto(obj) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('id', sql.Int, obj.id)
      .query('DELETE FROM PRODUTOS WHERE id = @id');
    
    return result.rowsAffected[0];
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    throw err;
  }
}

module.exports = { inserirProduto, buscarProduto, listarProduto, editarProduto, deletarProduto };
