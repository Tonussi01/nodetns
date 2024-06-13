// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtosRoute = require('./Routes/ProdutosRoutes'); // Importando as rotas de produtos
const authRoute = require('./Routes/AuthRoutes'); // Importando as rotas de autenticação
const vendasRoute = require('./Routes/VendasRoutes'); // Importando as rotas de vendas

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Usar as rotas definidas no arquivo produtosRoute.js
app.use('/api', produtosRoute);

// Usar as rotas definidas no arquivo authRoute.js
app.use('/api', authRoute);

// Usar as rotas definidas no arquivo vendasRoute.js
app.use('/api', vendasRoute);

// Rota para verificar se o servidor está funcionando
app.get('/status', (req, res) => {
  res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}/status`);
});
