const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoryResolver, CategoryChildrenResolver } = require("./queries/category.resolver");
const { CommentForBlog, CommentForCourse, CommentForProduct } = require("./mutations/comment.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { LikeProduct, LikeBlog, LikeCourse } = require("./mutations/like.resolver");
const { DislikeProduct, DislikeCourse, DislikeBlog } = require("./mutations/dislike.resolver");

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
        commentForBlog : CommentForBlog,
        commentForCourse : CommentForCourse,
        commentForProduct : CommentForProduct,
        likesForProduct : LikeProduct,
        likesForCourse : LikeCourse,
        likesForBlog : LikeBlog,
        dislikesForProduct : DislikeProduct,
        dislikesForCourse : DislikeCourse,
        dislikesForBlog : DislikeBlog,
    }
})

const graphqlSchema = new GraphQLSchema({
    query : RootQuery,
    mutation : RootMutation 
})

module.exports = {
    graphqlSchema
}