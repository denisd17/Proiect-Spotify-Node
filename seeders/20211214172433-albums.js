'use strict';
const db = require('../models');
const fs  = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const albumNames = fs.readFileSync("./albums.txt").toString().split('\n');
    const albums = [];
    const artistAlbums = []
    let albumArtistIdDict = new Object();
    let lastAlbumName = ""

    
    for(let i = 0; i < albumNames.length; i++) {
      /*
      albumData[0] = album name
      albumData[1] = artist name
      albumData[2] = album url
        */
      const albumData = albumNames[i].split("$");
    
      if(lastAlbumName.localeCompare(albumData[0])) {
        albums.push({
          name: albumData[0],
          link: albumData[2],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        albumArtistIdDict[albumData[0]] = []
      }
      lastAlbumName = albumData[0];

      await db.Artist.findAll({
        where: {
          name: albumData[1],
        },
        raw: true,
      }).then(artist =>{
        albumArtistIdDict[albumData[0]].push(artist[0].id);
      });
    }

    console.log(albumArtistIdDict);
    console.log(albums);
    await queryInterface.bulkInsert('Albums', albums , {});
    
    await db.Album.findAll().then(albums => {
      for(let i = 0; i < albums.length; i++) {
        for(let j = 0; j < albumArtistIdDict[albums[i].name].length; j++) {
          artistAlbums.push({
            albumId: albums[i].id,
            artistId: albumArtistIdDict[albums[i].name][j],
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      }
    })
    await queryInterface.bulkInsert('AlbumsArtists', artistAlbums , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
    await queryInterface.bulkDelete('AlbumsArtists', null, {});
  }
};
