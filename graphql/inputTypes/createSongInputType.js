const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

const createSongInputType = new GraphQLInputObjectType({
    name:'CreateSongInput',
    fields:{
        albumId:{
             type: new GraphQLNonNull (GraphQLID),
        },
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        link:{
            type: new GraphQLNonNull (GraphQLString)
        }
    }
});
module.exports = createSongInputType;