const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/formulario', (req, res) => {
  console.log(req.body);
  res.send('Dados recebidos com sucesso!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});