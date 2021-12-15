'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const allSongs = await db.Song.findAll();
    const likes = []

    for(let i = 0; i < allUsers.length; i++) {
      for(let j = 0; j < 10; j++) {
        const randomSongIndex = Math.floor(Math.random() * (allSongs.length - 1));
        likes.push({
          userId: allUsers[i].id,
          songId: allSongs[randomSongIndex].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    
    await queryInterface.bulkInsert('Likes', likes , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null , {});
  }
};
