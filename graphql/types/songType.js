const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const artistType = require("./artistType");

const songType = new GraphQLObjectType({
    name: 'Song',
    fields:{
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        link:{type: GraphQLString},
        artists:{
            type: GraphQLList( artistType),
            resolve:async(source)=>{
                return await source.getArtists();
            }
        },
    
    }
})

module.exports = songType