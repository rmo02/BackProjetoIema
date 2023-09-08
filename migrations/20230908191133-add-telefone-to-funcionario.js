'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Funcionarios', 'telefone', {
      type: Sequelize.STRING,
      allowNull: true, // ou false, dependendo se o telefone é obrigatório
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Funcionarios', 'telefone');
  },
};
