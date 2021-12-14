const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const artistType = require("./artistType");
const songType = require("./songType");

const albumType = new GraphQLObjectType({
    name: 'Album',
    fields:{
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        link:{type: GraphQLString},
        /*songs:{
            type: GraphQLList(songType),
            resolve: async (source) => {
                return await source.getSongs();
            }
        },
        artists:{
            type: GraphQLList(artistType),
            resolve: async(source) => {
                return await source.getArtists();
            }
        }*/
    
    }
})

module.exports = albumType