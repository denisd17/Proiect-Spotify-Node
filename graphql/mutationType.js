const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLIncludeDirective } = require("graphql");
const { createAlbum, updateAlbum, deleteAlbum, addAlbumArtist } = require("../repository/album");
const loginHandler = require("../repository/login");
const { updateSong, createSong, deleteSong } = require("../repository/song");
const { createUser, updateUser, likesSong, dislikesSong } = require("../repository/users");
const { createArtist, updateArtist, deleteArtist} = require("../repository/artist");
const addAlbumArtistInputType = require("./inputTypes/addAlbumArtistInputType");
const createAlbumInputType = require("./inputTypes/createAlbumInputType");
const createSongInputType = require("./inputTypes/createSongInputType");
const createUserInputType = require("./inputTypes/createUserInputType");
const loginInputType = require("./inputTypes/loginInputType");
const updateAlbumInputType = require("./inputTypes/updateAlbumInputType");
const createArtistInputType = require("./inputTypes/createArtistInputType");
const updateArtistInputType = require("./inputTypes/updateArtistInputType");
const updateSongInputType = require("./inputTypes/updateSongInputType");
const updateUserInputType = require("./inputTypes/updateUserInputType");
const albumType = require("./types/albumType");
const artistType = require("./types/artistType");
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
            resolve: async(source, args, context) => {
                return createUser(args.createUserInput, context); 
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
        },
        likeSong:{
            type: GraphQLInt,
            args:{
                songId:{
                    type: GraphQLInt,
                }
            },
            resolve: async(source,args, context) => {
                return likesSong(args, context);
            }
        },
        dislikeSong:{
            type:GraphQLInt,
            args:{
                songId:{
                    type: GraphQLInt,
                }
            },
            resolve: async(source,args,context) => {
                return dislikesSong(args, context);
            }
        },
        createAlbum:{
            type: albumType,
            args:{
                createAlbumInput:{
                    type: createAlbumInputType,
                }
            },
            resolve: async(source,args,context) => {
                return createAlbum(args.createAlbumInput, context);
            }
        },
        updateAlbum:{
            type: albumType,
            args:{
                updateAlbumInput:{
                    type: updateAlbumInputType,
                }
            },
            resolve: async(source,args,context) => {
                return updateAlbum(args.updateAlbumInput, context);
            }
        },
        deleteAlbum:{
            type: GraphQLString,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async(source, args, context) => {
                return deleteAlbum(args, context);
            }
        },
        addAlbumArtist:{
            type: GraphQLList(artistType),
            args:{
                addAlbumArtistInput:{
                    type: addAlbumArtistInputType,
                }
            },
            resolve: async(source, args, context) => {
                return addAlbumArtist(args.addAlbumArtistInput, context);
            }
        },
        createSong:{
            type: songType,
            args:{
                createSongInput:{
                    type: createSongInputType,
                }
            },
            resolve: async(source, args, context) => {
                return createSong(args.createSongInput, context);
            }
        },
        deleteSong:{
            type: GraphQLString,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLInt),
                }
            },
            resolve: async(source, args,context) => {
                return deleteSong(args,context);
            }
        },
        createArtist:{
            type: artistType,
            args:{
                createArtistInput:{
                    type: createArtistInputType,
                }
            },
            resolve: async(source,args,context) => {
                return createArtist(args.createArtistInput, context);
            }
        },
        updateArtist:{
            type: artistType,
            args:{
                updateArtistInput: {
                    type: updateArtistInputType,
                }
            },
            resolve: async(source,args,context) => {
                return updateArtist(args.updateArtistInput, context);
            }
        },
        deleteArtist:{
            type: GraphQLString,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async(source, args, context) => {
                return deleteArtist(args, context);
            }
        },

    },
})

module.exports = mutationType