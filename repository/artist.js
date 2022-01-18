const db = require('../models');
const Permissions = require('../config/permissions');

module.exports.getAllArtists = async (args, context) => {
    try {
        const allArtists = await db.Artist.findAll();
        return allArtists;
      } catch (error) {
        console.error('Something went wrong');
        return null;
      }
}

module.exports.createArtist = async (args, context)=> {
    const { user } = context;
    const hasPerm = await user.can(Permissions.CREATE_USER);
    if(!hasPerm){
      return false
    }
    const {
        name,
    } = args
    try{
    const newArtist = await db.Artist.create({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    
    return newArtist;
} catch(error){
    console.error("Something went wrong");
    return null;
}
}

module.exports.getArtistById = async (id)=> {
    return await db.Artist.findByPk(id);
}

module.exports.updateArtist = async (args, context)=> {
    const { user } = context;
    const hasPerm = await user.can(Permissions.UPDATE_USER);
    if(!hasPerm){
      return false
    }
    const {
        id,
        name,
    } = args
    console.log(args);
    try{
    await db.Artist.update({
        name,
    },
    {
    where:{
        id,
    }
    });
    return await db.Artist.findByPk(id);
} catch(error){
    console.error("Something went wrong");
    return null;
}
}

module.exports.deleteArtist = async (args, context)=> {
    const { user } = context;
    const hasPerm = await user.can(Permissions.DELETE_USER);
    if(!hasPerm){
      return false
    }
    try{
    const {id} = args;
    
    const foundArtist = await db.Artist.findByPk(id);

    if(!foundArtist){
        return "Artist does not exist!";
    }

    const artistAlbums = await db.Album.findAll({
      include: [{
        model: db.Artist,
        where: {id: id}
      }]
    });
    
    for(let i = 0; i < artistAlbums.length; i++) {
      albumId = artistAlbums[i].id;
      await db.Album.destroy({
        where: {
          id: albumId,
        }
      })
    }
    foundArtist.destroy();

    return "Artist deleted";
    } catch(error){
        return "Something went wrong";
    }
}