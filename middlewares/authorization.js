const jwt = require('jsonwebtoken');
const { MY_SECRET_KEY } = require('../config/jwt');
const db = require("../models");


const authorizationMiddleware = async  (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if(authorization) {
    try {
      const decoded = jwt.verify(authorization.replace('Bearer ', ''), MY_SECRET_KEY);
      console.log(decoded);
      const userId = decoded.id;
      console.log(userId);
      const user = await db.User.findByPk(userId);
      
      if(user){
        console.log("in if");
        req.user = user;
        next();
      }
      console.log("dupa if");

    } catch (e) {
      console.error('error', e);
      next();  
    }
  }
  else{
    next();
  }
}

module.exports = authorizationMiddleware;