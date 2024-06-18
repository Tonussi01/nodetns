// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtosRoute = require('./Routes/ProdutosRoutes.js'); // Importando as rotas de produtos
const authRoute = require('./Routes/AuthRoutes.js'); // Importando as rotas de autenticação
const vendasRoute = require('./Routes/VendasRoutes.js'); // Importando as rotas de vendas
const produtoVendaRoutes = require('./Routes/ProdutoVendaRoutes.js')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());


app.use('/api', produtosRoute);


app.use('/api', authRoute);


app.use('/api', vendasRoute);


app.use('/api', produtoVendaRoutes);

// Rota para verificar se o servidor está funcionando
app.get('/status', (req, res) => {
  res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}/status`);
});
