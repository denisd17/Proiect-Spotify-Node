const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');
const {getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist} = require('./controllers/artists')

const {getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, addAlbumArtist} = require('./controllers/albums')

const app = express();

app.use(bodyParser.json());

app.post("/login", loginHandler);

app.listen(port, () => {
    console.log("Server started on", port);
  });

app.get("/artists", authorizationMiddleware, getAllArtists);
app.get("/artists/:id", authorizationMiddleware, getArtistById);
app.post("/artists", authorizationMiddleware, createArtist);
app.put("/artists/:id", authorizationMiddleware, updateArtist);
app.delete("/artists/:id", authorizationMiddleware, deleteArtist);

app.post("/albums/:albumId/artists/:artistId", addAlbumArtist)

app.get("/albums", authorizationMiddleware, getAllAlbums);
app.get("/albums/:id", authorizationMiddleware, getAlbumById);
app.post("/albums", authorizationMiddleware, createAlbum);
app.put("/albums/:id", authorizationMiddleware, updateAlbum);
app.delete("/albums/:id", authorizationMiddleware, deleteAlbum);