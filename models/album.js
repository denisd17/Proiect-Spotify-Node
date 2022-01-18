'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Album.hasMany(models.Song, {
        onDelete: 'cascade'
      });
      models.Album.belongsToMany(models.Artist, {
        through: 'AlbumsArtists',
        onDelete: 'cascade'
      });
    }
  };
  Album.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};