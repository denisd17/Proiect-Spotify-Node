const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const updateUserInputType = new GraphQLInputObjectType({
    name:'LikeSongInput',
    fields:{
        songId:{
            type: GraphQLInt
        },
        
    }
});
module.exports = updateUserInputType;