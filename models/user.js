'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Song, {
        through: 'Likes',
        onDelete: 'cascade'
      });
      models.User.hasMany(models.Playlist, {onDelete:'cascade'});
      models.User.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }

    async can(permissionName){
      const role = await this.getRole();
      const permissions = role.permissions;
      return permissions.indexOf(permissionName) !== -1;
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};