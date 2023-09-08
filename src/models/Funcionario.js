const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Funcionario = sequelize.define('Funcionarios', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: DataTypes.STRING,
  telefones: {
    type: DataTypes.JSON, // Use JSON para armazenar números de telefone
    defaultValue: [], // Valor padrão é um array vazio
  },
});

module.exports = Funcionario;
