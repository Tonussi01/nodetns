const AuthModel = require('../Models/authModel');

async function login(req, res) {
  const { usuario, senha } = req.body;
  try {
    const valido = await AuthModel.verificarCredenciais(usuario, senha);
    if (valido) {
      res.status(200).send('Credenciais válidas');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    console.error('Erro ao processar login:', err);
    res.status(500).send('Erro ao verificar credenciais');
  }
}

module.exports = { login };
