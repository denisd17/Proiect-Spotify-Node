const db = require('../models');

module.exports.getAllSongs = async (req,res) => {

    try {

        const allSongs = await db.Song.findAll();
        res.send(allSongs);

      } catch (error) {

            console.error('Something went wrong');
            res.send({
                error: "Something went wrong",
            });
      }
}

module.exports.createSong = async (req,res)=> {

    const albumId = req.params.albumId;
    try{
        const {name,
               link,
            } = req.body;
        const newSong = await db.Song.create({
            name,
            link,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(newSong);
        const album = await db.Album.findByPk(albumId);
        newSong.setAlbum(album);
        
        res.status(201).send(newSong);

    } catch(error){

        res.send({
            error:"Something went wrong"
        });

    }
}

module.exports.getSongById = async ({params},res)=> {
    
    try{

        const id = params.id;
        const search = await db.Song.findByPk(id);
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

module.exports.updateSong = async (req,res)=> {

    const id = req.params.id
    const {name,
           link,
        } = req.body; 
    const song = db.Song.findByPk(id);

    try{

        await db.Song.update({
            name,
            link,
        },
        {
            where:{
                id,
            }
        });

        res.send(await db.Song.findByPk(id));

    } catch(error){

        res.send({
            error:"Something went wrong"
        });
    }
}


module.exports.deleteSong = async (req,res)=> {

    try{
        const id = req.params.id

        await db.Song.destroy({
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