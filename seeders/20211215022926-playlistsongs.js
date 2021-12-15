'use strict';

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allPlaylists = await db.Playlist.findAll();
    const allSongs = await db.Song.findAll();
    const playlistsSongs = []

    for(let i = 0; i < allPlaylists.length; i++) {
      for(let j = 0; j < 5; j++) {
        const randomSongIndex = Math.floor(Math.random() * (allSongs.length - 1));
        playlistsSongs.push({
          playlistId: allPlaylists[i].id,
          songId: allSongs[randomSongIndex].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    
    await queryInterface.bulkInsert('PlaylistsSongs', playlistsSongs , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PlaylistsSongs', null, {});
  }
};
