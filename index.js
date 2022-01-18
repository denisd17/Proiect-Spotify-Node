const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');
const {getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist, addArtistSong} = require('./controllers/artists')

const { getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, addAlbumArtist} = require('./controllers/albums');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, likesSong, getUserPlaylists } = require('./controllers/users');
const { getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist, addPlaylistSong } = require('./controllers/playlists');
const { getAllSongs, getSongById, createSong, updateSong, deleteSong } = require('./controllers/songs');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql');
const app = express();

app.use(bodyParser.json());

app.use('/graphql', authorizationMiddleware, graphqlHTTP({
  schema,
  graphiql: true,
}))

app.post("/login", loginHandler);

app.get("/songs", authorizationMiddleware, getAllSongs);
app.get("/songs/:id", authorizationMiddleware, getSongById);
app.post("/songs/:albumId", authorizationMiddleware, createSong);
app.put("/songs/:id", authorizationMiddleware, updateSong);
app.delete("/songs/:id", authorizationMiddleware, deleteSong);

app.get("/artists", authorizationMiddleware, getAllArtists);
app.get("/artists/:id", authorizationMiddleware, getArtistById);
app.post("/artists", authorizationMiddleware, createArtist);
app.put("/artists/:id", authorizationMiddleware, updateArtist);
app.delete("/artists/:id", authorizationMiddleware, deleteArtist);

app.post("/albums/:albumId/artists/:artistId", addAlbumArtist);
app.post("/artists/:artistId/songs/:songId", addArtistSong);

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

app.post("/playlists/:playlistId/songs/:songId", addPlaylistSong);

app.listen(port, () => {
    console.log("Server started on", port);
  });

