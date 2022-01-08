const Permissions = require('../config/permissions');
const db = require('../models');

module.exports.getAllUsers = async () => {
    try {

        const allUsers = await db.User.findAll();
        return allUsers;

      } catch (error) {

            console.error('Something went wrong');
            return null;
      }
}

module.exports.getUserById = async (id) => {
  return await db.User.findByPk(id);
}

module.exports.createUser = async (args, context) => {
  const { user } = context;
  const hasPerm = await user.can(Permissions.CREATE_USER);
  if(!hasPerm){
    return false
  }
  const { email, password, username } = args;
  try {
    const newUser = await db.User.create({
        username,
        password,
        email,
        roleId,
        
    });

    return newUser;

  } catch (error) {
    console.error(error);
    return null;
  }
}


module.exports.updateUser = async (args, context) => {
  const { user } = context;

  const { id } = user;
  
  const { email, username } = args;
  const hasPerm = await user.can(Permissions.UPDATE_USER);
  if(!hasPerm){
    return false
  }
  try {
    await db.User.update({
      email,username
    }, { where: { id } });

    return await db.User.findByPk(id);

  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports.deleteUser = (req, res) => {
  
}