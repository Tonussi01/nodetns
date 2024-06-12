require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote CORS

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Adicione o middleware CORS para todas as rotas

// Configuração do SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Usar SSL
    trustServerCertificate: true,
  },
};

// Função para verificar credenciais
async function verificarCredenciais(usuario, senha) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .input('senha', sql.VarChar, senha)
      .query('SELECT * FROM ACESS WHERE usuario = @usuario AND senha = @senha');
    
    return result.recordset.length > 0; // Retorna true se encontrar o usuário, false caso contrário
  } catch (err) {
    console.error('Erro ao verificar credenciais:', err); // Log detalhado do erro
    throw err; // Lança o erro para ser tratado externamente
  }
}

// Função para obter todos os registros cadastrados
async function obterRegistros() {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM ACESS'); // Substitua NOME_DA_TABELA pelo nome correto da tabela no seu banco de dados

    return result.recordset; // Retorna todos os registros encontrados na tabela
  } catch (err) {
    console.error('Erro ao obter registros:', err);
    throw err;
  }
}

// Endpoint para verificar credenciais
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const valido = await verificarCredenciais(usuario, senha);
    if (valido) {
      res.status(200).send('Credenciais válidas');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    console.error('Erro ao processar login:', err);
    res.status(500).send('Erro ao verificar credenciais');
  }
});

// Rota para obter todos os registros cadastrados
app.get('/', async (req, res) => {
  try {
    const registros = await obterRegistros();
    res.status(200).json(registros);
  } catch (err) {
    console.error('Erro ao processar requisição de registros:', err);
    res.status(500).send('Erro ao obter registros');
  }
});

// Rota para verificar se o servidor está funcionando
app.get('/status', (req, res) => {
  res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
