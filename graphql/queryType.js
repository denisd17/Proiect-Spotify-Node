const { GraphQLObjectType, GraphQLString } = require("graphql");
const db = require("../models");

const userType = new GraphQLObjectType({
    name: 'User',
    fields:{
        email: GraphQLString,
        username: GraphQLString
    }
})


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields : {
        users:{
            type: userType,
            resolve: async () => {
                return await db.User.findAll();
            }
        }
    }
})

module.exports = queryType;