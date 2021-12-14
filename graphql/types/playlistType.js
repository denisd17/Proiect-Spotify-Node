const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const songType = require("./songType");
const userType = require("./userType");

const playlistType = new GraphQLObjectType({
    name: 'Playlist',
    fields:{
        id: { type: GraphQLID},
        name: { type: GraphQLString},
       /* songs:{
            type: GraphQLList(songType),
            resolve: async(source) => {
                return await source.getSongs();
            }
        },
        user:{
            type: userType,
            resolve: async(source) => {
                return await source.getUser();
            }
        }*/
    }
})

module.exports = playlistType