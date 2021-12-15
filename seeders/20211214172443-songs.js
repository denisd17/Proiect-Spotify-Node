'use strict';
const db = require('../models');
const fs  = require("fs");
const { exit } = require('process');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const songNames = fs.readFileSync("./songs.txt").toString().split('\n');
    let songs = []
    const songsArtists = []
    /*
      songData[0] = name
      songData[1] = album name
      songData[2] = link
    */
    for(let i = 0; i < songNames.length; i++){
      const songData = songNames[i].split("$");
      const album = await db.Album.findOne({
        where: {
          name: songData[1],
        }
      });
      songs.push({
        name: songData[0],
        link: songData[2],
        albumId: album.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Songs', songs , {});
    
    songs = await db.Song.findAll();
    
    for(let i = 0; i < songs.length; i++){
      const song = songs[i];
      const albumArtists = await db.Album.findAll({
        where: {
          id: song.albumId,
        },
        include: db.Artist,
      });
      
      for(let j = 0; j < albumArtists.length; j++){
        for(let k = 0; k < albumArtists[j].Artists.length; k++){
          songsArtists.push({
            songId: song.id,
            artistId: albumArtists[j].Artists[k].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }
    await queryInterface.bulkInsert('SongsArtists', songsArtists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
    await queryInterface.bulkDelete('SongsArtists', null, {});
  }
};
