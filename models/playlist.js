'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Playlist.belongsTo(models.User, {
        foreignKey: 'userId',
        //onDelete: 'cascade'
      });
      models.Playlist.belongsToMany(models.Song, {
        through: 'PlaylistsSongs',
        //onDelete: 'cascade'
      });
    }
  };
  Playlist.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};