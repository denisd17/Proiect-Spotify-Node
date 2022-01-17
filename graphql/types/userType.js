const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const playlistType = require("./playlistType");
const songType = require("./songType");

const userType = new GraphQLObjectType({
    name: 'User',
    fields:{
        id: { type: GraphQLID},
        email: { type: GraphQLString},
        username: { type: GraphQLString},
        /*songs:{
            type: GraphQLList(songType),
            resolve: async(source) => {
                return await source.getSongs();
            }
        },*/
        playlists:{
            type: GraphQLList(playlistType),
            resolve: async (source) => {
                return await source.getPlaylists();
            }
        }
    }
})

module.exports = userType