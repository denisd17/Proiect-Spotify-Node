const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const db = require("../models");

const userType = require('./types/userType')
const playlistType = require('./types/playlistType')



const queryType = new GraphQLObjectType({
    name: 'Query',
    fields : {
        users:{
            type: new GraphQLList(userType),
            resolve: async () => {
                return await db.User.findAll();
            }
        },
        user:{
            type: userType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (source, {id}) => {
                return await db.User.findByPk(id);
            }
        },
    }
})

module.exports = queryType;