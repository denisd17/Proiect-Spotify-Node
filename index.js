const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');
const {getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist} = require('./controllers/artists')

const {getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, addAlbumArtist} = require('./controllers/albums');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, likesSong, getUserPlaylists } = require('./controllers/users');
const { getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist } = require('./controllers/playlists');

const app = express();

app.use(bodyParser.json());

app.post("/login", loginHandler);


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

app.post("/users/:userId/likedSongs/:songId", likesSong)

app.get("/users", authorizationMiddleware, getAllUsers);
app.get("/users/:id/playlists", authorizationMiddleware, getUserPlaylists);
app.get("/users/:id", authorizationMiddleware, getUserById);
app.post("/users", authorizationMiddleware, createUser);
app.put("/users/:id", authorizationMiddleware, updateUser);
app.delete("/users/:id", authorizationMiddleware, deleteUser);

app.get("/playlists", authorizationMiddleware, getAllPlaylists);
app.get("/playlists/:id", authorizationMiddleware, getPlaylistById);
app.post("/playlists/:userId", authorizationMiddleware, createPlaylist);
app.put("/playlists/:id", authorizationMiddleware, updatePlaylist);
app.delete("/playlists/:id", authorizationMiddleware, deletePlaylist);


app.listen(port, () => {
    console.log("Server started on", port);
  });

