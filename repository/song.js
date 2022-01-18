const db = require('../models');


module.exports.createSong = async (args,context)=> {

  try{
      const {albumId,
             name,
             link,
          } = args;
      const newSong = await db.Song.create({
          name,
          link,
          createdAt: new Date(),
          updatedAt: new Date(),
      });
      console.log(newSong);
      const album = await db.Album.findByPk(albumId);
      newSong.setAlbum(album);
      
      return newSong;

  } catch(error){

     console.error(error);
     return null;

  }
}

module.exports.getSongById = async (args,context)=> {
  
  try{

      const {id} = args;
      const search = await db.Song.findByPk(id);
      if (search === null) {

          console.error("Not found");
      
      } else {

          return search;
      
      }
  } catch(error){

     console.error(error);
     return null;

  }
}

module.exports.updateSong = async (args, context) => {
    const { user } = context;
    
    if(!user) {
      return null;
    }
  

    
    const {id, name, link } = args;
  
    try {
      await db.Song.update({
        name,
        link
      }, { where: { id } });
  
      return await db.Song.findByPk(id);
  
    } catch (e) {
      console.error(e);
      return null;
    }
  }


  module.exports.deleteSong = async (args,context)=> {

    try{
        const {id} = args

        await db.Song.destroy({
            where: {
                id,
            }
        });

        return "Song deleted";

    } catch(error){

       console.error(error);
       return null;
    }
}