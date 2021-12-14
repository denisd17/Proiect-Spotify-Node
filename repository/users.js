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

module.exports.createUser = async (args) => {
  const { email, password, username } = args;
  try {
    const newUser = await db.User.create({
        username,
        password,
        email,
        
    });

    return newUser;

  } catch (error) {
    console.error(error);
    return null;
  }
}


module.exports.updateUser = async (args, context) => {
  const { user } = context;
  
  if(!user) {
    return null;
  }

  const { id } = user;
  
  const { email, username } = args;

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