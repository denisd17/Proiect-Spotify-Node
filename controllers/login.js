const jwt = require('jsonwebtoken');
const findUser = require('../helpers/findUser');
const { MY_SECRET_KEY } = require('../config/jwt');

const loginHandler = (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  console.log(body)
  
  id = findUser(username, password)

  if(id) {
    const token = jwt.sign({id}, MY_SECRET_KEY);
    console.log(token)
    res.send({
      token,
    });
  } else {
    res.status(401).send({
      token: null,
    });
  }
}

module.exports = loginHandler; 