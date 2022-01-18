const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const updateAlbumInputType = new GraphQLInputObjectType({
    name:'UpdateAlbumInput',
    fields:{
        id:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        link:{
            type: new GraphQLNonNull(GraphQLString)
        },
        
    }
});

module.exports = updateAlbumInputType;