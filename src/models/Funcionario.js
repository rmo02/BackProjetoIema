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
  praca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: DataTypes.STRING, // Nome do arquivo da imagem
  telefones: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

module.exports = Funcionario;
