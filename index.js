const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');
const {getAllArtists} = require('./controllers/artists')

const app = express();

app.use(bodyParser.json());

app.post("/login", loginHandler);

app.listen(port, () => {
    console.log("Server started on", port);
  });

app.get("/artists", authorizationMiddleware, getAllArtists);