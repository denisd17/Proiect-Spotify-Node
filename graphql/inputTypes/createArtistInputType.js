const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

const createArtistInputType = new GraphQLInputObjectType({
    name:'CreateArtistInput',
    fields:{
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
    }
});
module.exports = createArtistInputType;