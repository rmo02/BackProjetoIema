const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Telefone = sequelize.define('Telefone', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FuncionarioId: {
    type: DataTypes.INTEGER, // Deve corresponder ao tipo da chave primária em Funcionario
    allowNull: false,
  },
});

Telefone.associate = (models) => {
  Telefone.belongsTo(models.Funcionario, { foreignKey: 'FuncionarioId', as: 'Funcionario' });
};

module.exports = Telefone;
