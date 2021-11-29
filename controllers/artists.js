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