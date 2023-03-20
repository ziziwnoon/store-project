const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql")
const { CommentType } = require("./comment.type")
const { userType, PublicCategoryType } = require("./public.type")

const EpisodeType = new GraphQLObjectType({
    name : "episodeType" ,
    fields:{
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        type : {type : GraphQLString},
        time : {type : GraphQLString},
        videoAddress : {type : GraphQLString}
    }
})

const ChapterType = new GraphQLObjectType({
    name : "chapterType" ,
    fields:{
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        episodes : {type : new GraphQLList(EpisodeType)}
    }
})

const CourseType = new GraphQLObjectType({
    name : "courseType" ,
    fields : {
        _id : {type : GraphQLString},
        teacher : {type : userType},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        short_text : {type : GraphQLString},
        image : {type : new GraphQLList(GraphQLString)},
        imageURL : {type : new GraphQLList(GraphQLString)},
        tags : {type : new GraphQLList(GraphQLString) },
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        status : {type : GraphQLString},
        chapters : {type :  new GraphQLList(ChapterType)},
        comments : {type : new GraphQLList(CommentType)}
    }
})

module.exports = {
    CourseType
}