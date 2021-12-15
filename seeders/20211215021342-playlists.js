'use strict';

const db = require("../models");
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const playlists = [];
    
    for(let i = 0; i < allUsers.length; i++) {
      playlists.push({
        userId: allUsers[i].id,
        name: faker.lorem.words(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    await queryInterface.bulkInsert('Playlists', playlists , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
