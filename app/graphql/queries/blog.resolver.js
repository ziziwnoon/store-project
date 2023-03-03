const { GraphQLList } = require("graphql")
const { BlogModel } = require("../../models/blogs")
const { blogType } = require("../typeDefs/blog.type")

const BlogResolver = {
    type : new GraphQLList(blogType),
    resolve : async () => {
        return await BlogModel.find({}).populate([{path :'author'} , {path : 'category'}])
    }
}

module.exports = {
    BlogResolver
}