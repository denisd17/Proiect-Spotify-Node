const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const addAlbumArtistInputType = new GraphQLInputObjectType({
    name:'AddAlbumArtistInput',
    fields:{
        albumId:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        artistId:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        
    }
});

module.exports = addAlbumArtistInputType;