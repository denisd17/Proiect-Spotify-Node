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
      models.Artist.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }
    async can(permissionName){
      const role = await this.getRole();
      const permissions = role.permissions;
      return permissions.indexOf(permissionName) !== -1;
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};