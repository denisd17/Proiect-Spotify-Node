const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = require("graphql");
const artistType = require("./artistType");
const userType = require("./userType");

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
        likes:{
            type: GraphQLInt,
            resolve:async(source)=>{
                return await source.getUsers().length();
            }
        }
    
    }
})

module.exports = songType