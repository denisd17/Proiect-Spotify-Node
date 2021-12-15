'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    data.push({
      username: "admin",
      password: "123456789",
      email: "admin@spotify.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
