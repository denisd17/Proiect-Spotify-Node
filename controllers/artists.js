const db = require('../models');

module.exports.getAllArtists = async (req,res) => {
    try {
        const allArtists = await db.Artist.findAll();
        res.send(allArtists);
      } catch (error) {
        console.error('Something went wrong');
        res.send({
          error: "Something went wrong",
        });
      }
}

module.exports.createArtist = async (req,res)=> {
    const {
        name,
    } = req.body
    try{
    const newArtist = await db.Artist.create({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    
    res.status(201).send(newArtist);
} catch(error){
    res.send({
        error:"Something went wrong"
    })
}
}



module.exports.getArtistById = async ({params},res)=> {
    try{
    const key = params.id;
    const search = await db.Artist.findByPk(key);
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


module.exports.updateArtist = async (req,res)=> {
    const id = req.params.id
    const {
        name,
    } = req.body
    try{
    await db.Artist.update({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
    where:{
        id,
    }
    });
    res.send(await db.Artist.findByPk(id));
} catch(error){
    res.send({
        error:"Something went wrong"
    })
}
}


module.exports.deleteArtist = async (req,res)=> {
    try{
    const id = req.params.id;
    
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
    

    await db.Artist.destroy({
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

module.exports.addArtistSong = async (req, res) => {
    const songId = req.params.songId;
    const artistId = req.params.artistId;

    try {
      const song = await db.Song.findByPk(songId);
      const artist = await db.Artist.findByPk(artistId);
      if(!song) {
        throw new Error("Song not found");
      }
  
      if(!artist) {
        throw new Error("Artist not found");
      }
      await artist.setSongs(song);

      const updatedArtists = await db.Artist.findByPk(artistId);
      const updatedArtistSong = await updatedArtists.getSongs();

      const response = {
        ...updatedArtists.toJSON(),
        tags: updatedArtistSong,
      }
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.send({
        error: "Something went wrong",
      });
    }
}