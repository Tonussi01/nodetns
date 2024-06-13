// Models/VendaModel.js
const sql = require('mssql');
const dbConfig = require('./../Config/dbConfig');

async function inserirVenda(obj) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('cliente', sql.VarChar, obj.cliente)
      .input('valor_compra', sql.Float, obj.valor_compra)
      .input('valor_custo_produtos', sql.Float, obj.valor_custo_produtos)
      .input('situacao', sql.Int, obj.situacao)
      .input('forma_pagamento', sql.Int, obj.forma_pagamento)
      .input('local_compra', sql.VarChar, obj.local_compra)
      .input('data_venda', sql.Date, obj.data_venda)
      .query('INSERT INTO VENDAS (cliente, valor_compra, valor_custo_produtos, situacao, forma_pagamento, local_compra, data_venda) VALUES (@cliente, @valor_compra, @valor_custo_produtos, @situacao, @forma_pagamento, @local_compra, @data_venda); SELECT SCOPE_IDENTITY() AS vendaId');
    
    return result.recordset[0].vendaId; // Retorna o ID da venda inserida
  } catch (err) {
    console.error('Erro ao inserir venda:', err);
    throw err;
  }
}

async function listarVendas() {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .query('SELECT id, cliente, valor_compra, valor_custo_produtos, situacao, forma_pagamento, local_compra, data_venda FROM VENDAS');
    
    return result.recordset; // Retorna todas as vendas registradas
  } catch (err) {
    console.error('Erro ao listar vendas:', err);
    throw err;
  }
}

async function editarVenda(id, obj) {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request()
        .input('id', sql.Int, id)
        .input('cliente', sql.VarChar, obj.cliente)
        .input('valor_compra', sql.Float, obj.valor_compra)
        .input('valor_custo_produtos', sql.Float, obj.valor_custo_produtos)
        .input('situacao', sql.Int, obj.situacao)
        .input('forma_pagamento', sql.Int, obj.forma_pagamento)
        .input('local_compra', sql.VarChar, obj.local_compra)
        .input('data_venda', sql.Date, obj.data_venda)
        .query(`
          UPDATE VENDAS 
          SET 
            cliente = @cliente, 
            valor_compra = @valor_compra, 
            valor_custo_produtos = @valor_custo_produtos, 
            situacao = @situacao, 
            forma_pagamento = @forma_pagamento, 
            local_compra = @local_compra, 
            data_venda = @data_venda 
          WHERE 
            id = @id
        `);
      
      return result.rowsAffected[0]; // Retorna o número de linhas afetadas
    } catch (err) {
      console.error('Erro ao editar venda:', err);
      throw err;
    }
  }

async function deletarVenda(id) {
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

module.exports = { inserirVenda, listarVendas, editarVenda, deletarVenda };
