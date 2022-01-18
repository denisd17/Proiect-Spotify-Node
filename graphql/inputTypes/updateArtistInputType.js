const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const updateArtistInputType = new GraphQLInputObjectType({
    name:'UpdateArtistInput',
    fields:{
        id:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },        
    }
});

module.exports = updateArtistInputType;