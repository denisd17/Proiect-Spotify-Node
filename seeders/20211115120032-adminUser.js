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
      roleId: 2,
    });
    data.push({
      username: "user",
      password: "123456789",
      email: "user@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId: 1,
    });

    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
