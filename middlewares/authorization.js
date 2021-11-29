const jwt = require('jsonwebtoken');
const { MY_SECRET_KEY } = require('../config/jwt');

const authorizationMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if(authorization) {
    try {
      const decoded = jwt.verify(authorization.replace('Bearer ', ''), MY_SECRET_KEY);
      console.log(decoded);
      next();
    } catch (e) {
      res.send({
        error: "Invalid token"
      });
    }
  }
}

module.exports = authorizationMiddleware;