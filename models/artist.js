'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Artist.belongsToMany(models.Album, {
        through: 'AlbumsArtists',
        onDelete: 'cascade'
      });
      models.Artist.belongsToMany(models.Song, {
        through: 'SongsArtists',
        onDelete: 'cascade'
      });
    }
  };
  Artist.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};