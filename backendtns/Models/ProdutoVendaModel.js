const sql = require('mssql');
const dbConfig = require('./../Config/dbConfig');

async function inserirProdutoPorIdVenda(obj) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('produto', sql.VarChar, obj.produto)
      .input('id_produto', sql.Int, obj.id_produto)
      .input('valor_custo_produto', sql.Decimal, obj.valor_custo_produto)
      .input('valor_venda_produto', sql.Decimal, obj.valor_venda_produto)
      .input('quantidade', sql.Int, obj.quantidade)
      .input('id_venda', sql.Int, obj.id_venda)
      .input('data_venda', sql.Date, obj.data_venda)
      .query('INSERT INTO PRODUTOS_VENDA (produto, id_produto, valor_custo_produto, valor_venda_produto, quantidade, id_venda, data_venda) VALUES (@produto, @id_produto, @valor_custo_produto, @valor_venda_produto, @quantidade, @id_venda, @data_venda)');
    
      return result.rowsAffected[0];
  } catch (err) {
    console.error('Erro ao inserir produto da venda:', err);
    throw err;
  }
}

async function listarProdutosVendaId(id_venda) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('id_venda', sql.Int, id_venda)
      .query('SELECT id, produto, id_produto, valor_custo_produto, valor_venda_produto, quantidade, id_venda, data_venda FROM PRODUTOS_VENDA WHERE id_venda = @id_venda');
    
      return result.recordset;
  } catch (err) {
    console.error('Erro ao listar produtos da venda:', err);
    throw err;
  }
}

async function listarProdutosVendas() {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()     
      .query('SELECT id, produto, id_produto, valor_custo_produto, valor_venda_produto, quantidade, id_venda, data_venda FROM PRODUTOS_VENDA');
    
      return result.recordset; // Retorna a primeira venda encontrada com o ID especificado
  } catch (err) {
    console.error('Erro ao buscar venda por ID:', err);
    throw err;
  }
}


async function deletar1ProdutoVenda(id) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM VENDAS WHERE id = @id');
    
    return result.rowsAffected[0]; // Retorna o número de linhas afetadas
  } catch (err) {
    console.error('Erro ao deletar venda:', err);
    throw err;
  }
}

async function deletarProdutosVenda(id_venda) {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request()
        .input('id_venda', sql.Int, id_venda)
        .query('DELETE FROM VENDAS WHERE id_venda = @id_venda');
      
      return result.rowsAffected[0]; // Retorna o número de linhas afetadas
    } catch (err) {
      console.error('Erro ao deletar venda:', err);
      throw err;
    }
  }

module.exports = { inserirProdutoPorIdVenda, listarProdutosVendaId, listarProdutosVendas, deletar1ProdutoVenda, deletarProdutosVenda };
