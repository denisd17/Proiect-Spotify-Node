const db = require("../models");

const findUser = async (username, password) => {
    const user = await db.User.findOne({
      where: {
          username,
          password,
      }
    }).then(user => {
      if(user) {
        return user.id;
      }
      return null;
    });
  }
  
  module.exports = findUser; 