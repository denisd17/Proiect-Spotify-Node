'use strict';
const db = require('../models');
const fs  = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const artistNames = fs.readFileSync("./artists.txt").toString().split('\n');
    const artists = [];
    artistNames.forEach(element => artists.push({
      name: element,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Artists', artists , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
