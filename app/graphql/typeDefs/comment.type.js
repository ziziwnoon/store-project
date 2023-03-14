const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = require("graphql");
const { userType } = require("./public.type");


const ParentOfCommentType = new GraphQLObjectType({
    name : "parentOfCommentType",
    fields : {
        user : {type : userType},
        comment : {type : GraphQLString},
    }
})
const CommentType = new GraphQLObjectType({
    name : "commentType",
    fields : {
        user : {type : userType},
        comment : {type : GraphQLString},
        visiblity : {type : GraphQLBoolean},
        allowToComment : {type : GraphQLBoolean},
        parent : {type : ParentOfCommentType}
    }
})

module.exports = {
    CommentType
}