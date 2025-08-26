const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10792206",
  password: "hKT4bm2WIP",
  database: "sql10792206"
});

// Teste de conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
  } else {
    console.log("Conectado ao MySQL com sucesso!");
  }
});

// Rota para salvar presente
app.post("/presentes", (req, res) => {
  const { nome, data_presente, presente_escolhido } = req.body;

  if (!nome || !data_presente || !presente_escolhido) {
    return res.status(400).send("Dados incompletos");
  }

  const sql = "INSERT INTO presentes (nome, data_presente, presente_escolhido) VALUES (?, ?, ?)";
  db.query(sql, [nome, data_presente, presente_escolhido], (err, result) => {
    if (err) {
      console.error("Erro ao inserir:", err);
      return res.status(500).send("Erro ao salvar no banco");
    }
    res.send("Presente registrado com sucesso!");
  });
});

// Rota para listar presentes escolhidos
app.get("/presentes", (req, res) => {
  const sql = "SELECT nome, data_presente, presente_escolhido FROM presentes";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar presentes:", err);
      return res.status(500).send("Erro ao consultar o banco");
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});