const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/mensagem', (req, res) => {
  const mensagem = req.body.mensagem;
  console.log("Mensagem recebida:", mensagem);
 
  fs.writeFileSync('mensagens.json', JSON.stringify({ mensagem }, null, 2));

  res.send("Mensagem recebida com sucesso!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
