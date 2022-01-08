'use strict';

const Permissions = require("../config/permissions");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      permissions: {
        type: Sequelize.STRING
      }
    });

    await queryInterface.bulkInsert('Roles', [
      {
        name: 'user',
        permissions: "READ_USER",
      },
      {
        name: 'admin',
        permissions: Object.keys(Permissions).join(","),
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  }
};