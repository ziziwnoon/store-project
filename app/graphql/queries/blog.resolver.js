const { GraphQLList, GraphQLString } = require("graphql");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs")
const { BlogType } = require("../typeDefs/blog.type")

const BlogResolver = {
    type : new GraphQLList(BlogType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async (_ , args , context) => {
        const {category} = args;
        const findQuery = category ? {category} : {}
        const {req} = context;
        req.user = await verifyAccesstokenInGraphQL(req)
        return await BlogModel.find(findQuery).populate([{path :'author'} , 
        {path : 'category'} , 
        {path : 'comments.user'} , 
        {path : 'comments.answers.user'}])
    }
}

module.exports = {
    BlogResolver
}