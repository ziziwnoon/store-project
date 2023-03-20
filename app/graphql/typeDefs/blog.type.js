const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql")
const { CommentType } = require("./comment.type")
const { userType, categoryType, PublicCategoryType } = require("./public.type")

const BlogType = new GraphQLObjectType({
    name : "BlogType" ,
    fields : {
        _id : {type : GraphQLString},
        author : {type : userType},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        short_text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString) },
        category : {type : PublicCategoryType},
        comments : {type : new GraphQLList(CommentType)},
        likes : {type : new GraphQLList(userType)},
        dislikes : {type : new GraphQLList(userType)},
        bookmark : {type : new GraphQLList(userType)},
    }
})

module.exports = {
    BlogType
}