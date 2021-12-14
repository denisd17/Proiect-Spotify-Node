const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const albumType = require("./albumType");

const artistType = new GraphQLObjectType({
    name: 'Artist',
    fields:{
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        /*albums: {
            type: GraphQLList(albumType),
            resolve: async(source) => {
                return await source.getAlbums();
            }
        }*/
    
    }
})

module.exports = artistType