const { GraphQLObjectType } = require("graphql");
const loginHandler = require("../repository/login");
const { updateSong } = require("../repository/song");
const { createUser, updateUser } = require("../repository/users");
const createUserInputType = require("./inputTypes/createUserInputType");
const loginInputType = require("./inputTypes/loginInputType");
const updateSongInputType = require("./inputTypes/updateSongInputType");
const updateUserInputType = require("./inputTypes/updateUserInputType");
const loginResultType = require("./types/loginResultType");
const songType = require("./types/songType");
const userType = require("./types/userType");

const mutationType = new GraphQLObjectType({
    name :'Mutation',
    fields: {
        login:{
            type:loginResultType,
            args:{
                loginInput:{
                    type:loginInputType
                }
            },
            resolve: (source, args) => {
                const {email, password} = args.loginInput;
                const token= loginHandler(email,password);
                return {token,};
            }
        },
        createUser:{
            type:userType,
            args:{
                createUserInput:{
                    type:createUserInputType
                }
            },
            resolve: async(source,args) => {
                return createUser(args.createUserInput)
            }
        },
        updateUser:{
            type:userType,
            args:{
                updateUserInput:{
                    type:updateUserInputType,

                }
            },
            resolve: async(source, args, context) => {
                return updateUser(args.updateUserInput, context);
            }
        },
        updateSong: {
            type: songType,
            args:{
                updateSongInput:{
                    type: updateSongInputType,
                }
            },
            resolve: async (source, args, context) => {
                return updateSong(args.updateSongInput, context);
            }
        }
    },
})

module.exports = mutationType