const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const updateUserInputType = new GraphQLInputObjectType({
    name:'UpdateUserInput',
    fields:{
        email:{
            type: new GraphQLNonNull(GraphQLString)
        },
        username:{
            type: GraphQLString
        }
    }
});
module.exports = updateUserInputType;