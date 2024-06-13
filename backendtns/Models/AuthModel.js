// models/authModel.js
const sql = require('mssql');
const dbConfig = require('./../Config/dbConfig');

async function verificarCredenciais(usuario, senha) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .input('senha', sql.VarChar, senha)
      .query('SELECT * FROM ACESS WHERE usuario = @usuario AND senha = @senha');
    
    return result.recordset.length > 0;
  } catch (err) {
    console.error('Erro ao verificar credenciais:', err);
    throw err;
  }
}

module.exports = { verificarCredenciais };
