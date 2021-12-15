const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

const updateSongInputType = new GraphQLInputObjectType({
    name:'UpdateSongInput',
    fields:{
        id:{
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
module.exports = updateSongInputType;