const db = require('../models');


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