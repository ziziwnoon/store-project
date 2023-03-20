const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql")
const { CommentType } = require("./comment.type")
const { userType, categoryType, PublicCategoryType } = require("./public.type")

const featuresType = new GraphQLObjectType({
    name : "featuresType",
    fields : {
        length : {type : GraphQLString},
        height : {type : GraphQLString},
        width : {type : GraphQLString},
        weight: {type : GraphQLString},
        color : {type : new GraphQLList(GraphQLString)},
        model : {type : new GraphQLList(GraphQLString)},
        madein : {type : GraphQLString},
    }
})

const ProductType = new GraphQLObjectType({
    name : "productType" ,
    fields : {
        _id : {type : GraphQLString},
        supplier : {type : userType},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        short_text : {type : GraphQLString},
        images : {type : new GraphQLList(GraphQLString)},
        imagesURL : {type : new GraphQLList(GraphQLString)},
        tags : {type : new GraphQLList(GraphQLString) },
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        features : {type : featuresType},
        comments : {type : new GraphQLList(CommentType)},
        likes : {type : new GraphQLList(userType)},
        dislikes : {type : new GraphQLList(userType)},
        bookmark : {type : new GraphQLList(userType)},
    }
})


module.exports = {
    ProductType
}