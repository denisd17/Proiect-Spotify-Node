'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Song.belongsToMany(models.User, {
        through: 'Likes'
      });
      models.Song.belongsToMany(models.Playlist, {
        through: 'PlaylistsSongs'
      });
      models.Song.belongsToMany(models.Artist, {
        through: 'SongsArtists'
      });
      models.Song.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });
    }
  };
  Song.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};