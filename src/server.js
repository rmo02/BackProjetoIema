const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const employeesRouter = require("./routes/employees");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuração para servir imagens estáticas
app.use("/uploads", express.static("uploads"));

// Sincronize os modelos com o banco de dados
sequelize
  .sync({ force: false }) // Use { force: false } para evitar a recriação das tabelas
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar as tabelas:", error);
  });

// Rotas para funcionários
app.use("/employees", employeesRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
