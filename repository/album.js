const db = require('../models');
const Permissions = require('../config/permissions');

module.exports.getAllAlbums = async () => {
    try {
        const allAlbums = await db.Album.findAll();
        return allAlbums;

    } catch (error) {
        console.error('Something went wrong');
        return null;
    }
}

module.exports.createAlbum = async (args, context) => {
    const { user } = context;
    const hasPerm = await user.can(Permissions.CREATE_USER);
    if(!hasPerm){
      return false
    }
    const {
        name,
        link,
    } = args
    try {
        const newAlbum = await db.Album.create({
            name,
            link,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return newAlbum;
    } catch (error) {
        console.error("Something went wrong")
        return null;
    }
}



module.exports.getAlbumById = async ({ id }, context) => {
    return await db.Album.findByPk(id);
}


module.exports.updateAlbum = async (args, context) => {
    const { user } = context;
    const hasPerm = await user.can(Permissions.UPDATE_USER);
    if(!hasPerm){
      return false
    }
    const { id,
        name,
        link,
    } = args
    try {
        await db.Album.update({
            name,
            link,
        },
            {
                where: {
                    id,
                }
            });
        return await db.Album.findByPk(id);
    } catch (error) {
        console.error(e);
        return null;
    }
}


module.exports.deleteAlbum = async (args, context) => {
    const { user } = context;
    const hasPerm = await user.can(Permissions.DELETE_USER);
    if(!hasPerm){
      return false
    }
    try {
        const { id } = args
        const album = await db.Album.findByPk(id);

        if(!album){
            return "Album does not exist!";
        }

        album.destroy();
        
        return "Album deleted";
    } catch (error) {
        console.error(error);
        return null;
    }
}



module.exports.addAlbumArtist = async (args, context) => {
    const { user } = context;
    var hasPerm = await user.can(Permissions.CREATE_USER);
    if(!hasPerm){
      return false
    }
    hasPerm = await user.can(Permissions.CREATE_USER);
    if(!hasPerm){
      return false
    }
    const { artistId, albumId } = args;

    try {
        const artist = await db.Artist.findByPk(artistId);
        const album = await db.Album.findByPk(albumId);
        if (!artist) {
            throw new Error("Artist not found");
        }

        if (!album) {
            throw new Error("Album not found");
        }

        const artists = await album.getArtists();
        
        for (let i = 0; i < artists.length; i++) {
            if (artistId == artists[i].id) {
                console.error("Artist already exists")
                return null;
            }
        }


        await album.addArtist(artist);
        const updatedAlbum = await db.Album.findByPk(albumId);
        const updatedAlbumArtists = await updatedAlbum.getArtists();


        return updatedAlbumArtists;

} catch (error) {
    console.error(error);
    return null;
}
}
