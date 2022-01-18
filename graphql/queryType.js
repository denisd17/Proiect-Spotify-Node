const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInt } = require("graphql");
const db = require("../models");

const userType = require('./types/userType')
const playlistType = require('./types/playlistType');
const songType = require("./types/songType");
const { likesSong } = require("../repository/users");
const albumType = require("./types/albumType");
const artistType = require("./types/artistType");
const { getAllAlbums, getAlbumById } = require("../repository/album");



const queryType = new GraphQLObjectType({
    name: 'Query',
    fields : {
        users:{
            type: new GraphQLList(userType),
            resolve: async () => {
                return await db.User.findAll();
            }
        },
        user:{
            type: userType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (source, {id}) => {
                return await db.User.findByPk(id);
            }
        },
        songs:{
            type: new GraphQLList(songType),
            resolve: async() => {
                return db.Song.findAll();
            }
        },
        playlists:{
            type: new GraphQLList(playlistType),
            resolve: async() => {
                return db.Playlist.findAll();
            }
        },
        artist:{
            type: artistType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (source, {id}) => {
                return await db.Artist.findByPk(id);
            }
        },
        artists:{
            type: new GraphQLList(artistType),
            resolve: async() => {
                return db.Artist.findAll();
            }
        },
        getAllAlbums:{
            type: new GraphQLList(albumType),
            resolve: async() => {
                return getAllAlbums();
            }
        },
        getAlbumById:{
            type: albumType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLInt),
                }
            },
            resolve: async(source,args,context) => {
                return getAlbumById(args,context);
            }
        }
    }
})

module.exports = queryType;