const db = require('../models');

module.exports.getAllAlbums = async (req,res) => {
    try {
        const allAlbums = await db.Album.findAll();
        res.send(allAlbums);
      } catch (error) {
        console.error('Something went wrong');
        res.send({
          error: "Something went wrong",
        });
      }
}

module.exports.createAlbum = async (req,res)=> {
    const {
        name,
        link,
    } = req.body
    try{
    const newAlbum = await db.Album.create({
        name,
        link,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    
    res.status(201).send(newAlbum);
} catch(error){
    res.send({
        error:"Something went wrong"
    })
}
}



module.exports.getAlbumById = async ({params},res)=> {
    try{
    const key = params.id;
    const search = await db.Album.findByPk(key);
    if (search === null) {
    res.send("Not found!")
    } else {
        res.send(search);
    }
    } catch(error){
        res.send({
            error:"Something went wrong"
        })      
    }
}


module.exports.updateAlbum = async (req,res)=> {
    const id = req.params.id
    const {
        name,
        link,
    } = req.body
    try{
    await db.Album.update({
        name,
        link,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
    where:{
        id,
    }
    });
    res.send(await db.Album.findByPk(id));
} catch(error){
    res.send({
        error:"Something went wrong"
    })
}
}


module.exports.deleteAlbum = async (req,res)=> {
    try{
    const id = req.params.id
    await db.Album.destroy({
        where: {
          id,
        }
      });
      res.send("Success")
    } catch(error){
        res.send({
            error:"Something went wrong"
        })
    }
}



module.exports.addAlbumArtist = async (req, res) => {
    const artistId = req.params.artistId;
    const albumId = req.params.albumId;

    try {
      const artist = await db.Artist.findByPk(artistId);
      const album = await db.Album.findByPk(albumId);
      if(!artist) {
        throw new Error("Artist not found");
      }
  
      if(!album) {
        throw new Error("Album not found");
      }
      await album.setArtists(artist);

      const updatedAlbums = await db.Album.findByPk(albumId);
      const updatedAlbumArtist = await updatedAlbums.getArtists();

      const response = {
        ...updatedAlbums.toJSON(),
        tags: updatedAlbumArtist,
      }
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.send({
        error: "Something went wrong",
      });
    }
}
