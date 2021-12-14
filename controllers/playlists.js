const db = require('../models');

module.exports.getAllPlaylists = async (req,res) => {

    try {

        const allPlaylists = await db.Playlist.findAll();
        res.send(allPlaylists);

      } catch (error) {

            console.error('Something went wrong');
            res.send({
                error: "Something went wrong",
            });
      }
}

module.exports.createPlaylist = async (req,res)=> {

    const userId = req.params.userId;
    try{
        const {name} = req.body;
        const newPlaylist = await db.Playlist.create({
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(newPlaylist);
        const user = await db.User.findByPk(userId);
        newPlaylist.setUser(user);
        
        res.status(201).send(newPlaylist);

    } catch(error){

        res.send({
            error:"Something went wrong"
        });

    }
}



module.exports.getPlaylistById = async ({params},res)=> {
    
    try{

        const id = params.id;
        const search = await db.Playlist.findByPk(id);
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


module.exports.updatePlaylist = async (req,res)=> {

    const id = req.params.id
    const { name} = req.body 
    const playlist = db.User.findByPk(id);

    try{

        await db.Playlist.update({
            name,
        },
        {
            where:{
                id,
            }
        });

        res.send(await db.Playlist.findByPk(id));

    } catch(error){

        res.send({
            error:"Something went wrong"
        });
    }
}


module.exports.deletePlaylist = async (req,res)=> {

    try{
        const id = req.params.id

        await db.Playlist.destroy({
            where: {
                id,
            }
        });

        res.send("Success");

    } catch(error){

        res.send({
            error:"Something went wrong"
        })
    }
}

module.exports.addPlaylistSong = async (req, res) => {
    const songId = req.params.songId;
    const playlistId = req.params.playlistId;

    try {
      const song = await db.Song.findByPk(songId);
      const playlist = await db.Playlist.findByPk(playlistId);
      if(!song) {
        throw new Error("Song not found");
      }
  
      if(!playlist) {
        throw new Error("Playlist not found");
      }
      await playlist.setSongs(song);

      const updatedPlaylists = await db.Playlist.findByPk(playlistId);
      const updatedPlaylistSong = await updatedPlaylists.getSongs();

      const response = {
        ...updatedPlaylists.toJSON(),
        tags: updatedPlaylistSong,
      }
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.send({
        error: "Something went wrong",
      });
    }
}
