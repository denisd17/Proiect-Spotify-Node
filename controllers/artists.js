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
    const id = req.params.id
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