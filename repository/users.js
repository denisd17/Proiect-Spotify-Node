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

  
  const { email, password, username} = args;
  try {
    const newUser = await db.User.create({
        username,
        password,
        email,
        roleId : 1,
        
    });
    console.log(newUser);
    console.log(args);

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


module.exports.likesSong = async (args, context) => {

  const {user} = context;
  const {id} = user;
  userId = id;
  const {songId} = args;

  try{

      const user = await db.User.findByPk(userId);
      const song = await db.Song.findByPk(songId);
      console.log(song);
      const likes = await song.getUsers();

      if (!user){

          console.error("User not found!");
      
      }

      if (!song) {

          console.error ("Song not found!");
     
      }
      for(let i = 0; i < likes.length; i++){
        if (likes[i].id == userId){
          console.error("Userul a mai apreciat");
          return null;
        }
      }
        
      await user.addSong(song);
      const updatedSong = await db.Song.findByPk(songId);
      const updatedLikes = await updatedSong.getUsers();
      

      return updatedLikes.length;

  } catch (error){
      console.error(error)
      return null;
  }
}


module.exports.dislikesSong = async (args,context) => {

  const {user} = context;
  const userId = user.id;
  const {songId} = args;

  try{

      const user = await db.User.findByPk(userId);
      const song = await db.Song.findByPk(songId);
      const likes = await song.getUsers();
      console.log(user, song);
      if (!user){

          throw new Error ("User not found!");
      
      }

      if (!song) {

          throw new Error ("Song not found!");
     
      }

      for(let i = 0; i < likes.length; i++){
        if (likes[i].id == userId){
          likes.splice(i, 1);
          user.removeSong(song);
          const updatedSong = await db.Song.findByPk(songId);
          const updatedLikes = await updatedSong.getUsers();
          
    
          return updatedLikes.length;
        }
      }
      return null;
      
      

  } catch (error){
      console.error("Something went wrong")
      return null;
  }
}

module.exports.deleteUser = (req, res) => {
  
}