const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList } = require("graphql");
const { userType } = require("./public.type");


const AnswersOfCommentType = new GraphQLObjectType({
    name : "AnswersOfCommentType",
    fields : {
        _id : {type : GraphQLString},
        user : {type : userType},
        comment : {type : GraphQLString},
        visiblity : {type : GraphQLBoolean},
        allowToComment : {type : GraphQLBoolean},
    }
})
const CommentType = new GraphQLObjectType({
    name : "commentType",
    fields : {
        _id : {type : GraphQLString},
        user : {type : userType},
        comment : {type : GraphQLString},
        visiblity : {type : GraphQLBoolean},
        allowToComment : {type : GraphQLBoolean},
        createdAt : {type : GraphQLString},
        answers : {type : new GraphQLList(AnswersOfCommentType)}
    }
})

module.exports = {
    CommentType
}