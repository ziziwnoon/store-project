const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoryResolver, CategoryChildrenResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { ProductResolver } = require("./queries/product.resolver");

const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        blogs : BlogResolver,
        products : ProductResolver,
        categories : CategoryResolver,
        categoryChildren : CategoryChildrenResolver,
        courses : CourseResolver,
    }
})

const RootMutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {

    }
})

const graphqlSchema = new GraphQLSchema({
    query : RootQuery,
    // mutation : RootMutation 
})

module.exports = {
    graphqlSchema
}