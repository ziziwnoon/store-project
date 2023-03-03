const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql")
const { authorType, categoryType } = require("./public.type")

const blogType = new GraphQLObjectType({
    name : "blogType" ,
    fields : {
        _id : {type : GraphQLString},
        author : {type : authorType},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        short_text : {type : GraphQLString},
        image : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString) },
        category : {type : new GraphQLList(categoryType)},
    }
})

module.exports = {
    blogType
}