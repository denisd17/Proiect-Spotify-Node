const db = require('../models');

module.exports.getAllUsers = async (req,res) => {

    try {

        const allUsers = await db.User.findAll();
        res.send(allUsers);

      } catch (error) {

            console.error('Something went wrong');
            res.send({
                error: "Something went wrong",
            });
      }
}

module.exports.createUser = async (req,res)=> {

    const { username, password, email } = req.body
    try{

        const newUser = await db.User.create({
            username,
            password,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        res.status(201).send(newUser);

    } catch(error){

        res.send({
            error:"Something went wrong"
        });

    }
}



module.exports.getUserById = async ({params},res)=> {
    
    try{

        const id = params.id;
        const search = await db.User.findByPk(id);
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


module.exports.updateUser = async (req,res)=> {

    const id = req.params.id
    const { username, password, email} = req.body 
    const user = db.User.findByPk(id);
    const createdAt = user.get('createdAt');
    try{

        await db.User.update({
            username,
            password,
            email,
            createdAt,
            updatedAt: new Date(),
        },
        {
            where:{
                id,
            }
        });

        res.send(await db.User.findByPk(id));

    } catch(error){

        res.send({
            error:"Something went wrong"
        });
    }
}


module.exports.deleteUser = async (req,res)=> {

    try{
        const id = req.params.id

        await db.User.destroy({
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

module.exports.likesSong = async (req,res) => {

    const userId = req.params.userId;
    const songId = req.params.songId;

    try{

        const user = await db.User.findByPk(userId);
        const song = await db.Song.findByPk(songId);
        const likes = song.getUsers();

        if (!user){

            throw new Error ("User not found!");
        
        }

        if (!song) {

            throw new Error ("Song not found!");
       
        }

        if (likes.includes(user)) {

            throw new Error("User already liked the song!");
        }
        
        await user.addSong(song);
        const updatedSong = await db.Song.findByPk(songId);
        const updatedLikes = await updatedSong.getUsers();
        const response = {
            ...updatedSong.toJSON(),
            likes: updatedLikes, 
        }

        res.status(201).send(response);

    } catch (error){

        res.send({
            error: "Something went wrong"
        })
    }
}


module.exports.dislikesSong = async (req,res) => {

    const userId = req.params.userId;
    const songId = req.params.songId;

    try{

        const user = await db.User.findByPk(userId);
        const song = await db.Song.findByPk(songId);
        const likes = song.getUsers();

        if (!user){

            throw new Error ("User not found!");
        
        }

        if (!song) {

            throw new Error ("Song not found!");
       
        }

        if (!likes.includes(user)) {

            throw new Error("User doesn't like the song!");
        }
        
        const index = likes.indexOf(user);
        likes.splice(index, 1);
        const updatedSong = await db.Song.findByPk(songId);
        const updatedLikes = await updatedSong.getUsers();
        const response = {
            ...updatedSong.toJSON(),
            likes: updatedLikes, 
        }

        res.status(201).send(response);

    } catch (error){

        res.send({
            error: "Something went wrong"
        })
    }
}



module.exports.getUserPlaylists = async ({params}, res) => {

    try{

        const id = params.id;
        const user = await db.User.findByPk(id);
        const search = await user.getPlaylists();
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