const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const createAlbumInputType = new GraphQLInputObjectType({
    name:'CreateAlbumInput',
    fields:{
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        link:{
            type: new GraphQLNonNull(GraphQLString)
        },
        
    }
});

module.exports = createAlbumInputType;