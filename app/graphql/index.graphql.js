const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoryResolver, CategoryChildrenResolver } = require("./queries/category.resolver");
const { CommentForBlog, CommentForCourse, CommentForProduct } = require("./mutations/comment.resolver");
const { AddCourseToBasket, AddProductToBasket, RemoveProductFromBasket, RemoveCourseFromBasket} = require("./mutations/basket.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { getUserBlogBookmarks, getUserProductBookmarks, getUserCourseBookmarks , getUserBasket } = require("./queries/user-profile.resolver");
const { LikeProduct, LikeBlog, LikeCourse } = require("./mutations/like.resolver");
const { BookmarkProduct, BookmarkCourse, BookmarkBlog } = require("./mutations/bookmark.resolver");
const { DislikeProduct, DislikeCourse, DislikeBlog } = require("./mutations/dislike.resolver");

const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        blogs : BlogResolver,
        products : ProductResolver,
        categories : CategoryResolver,
        categoryChildren : CategoryChildrenResolver,
        courses : CourseResolver,
        getUserBlogBookmarks,
        getUserProductBookmarks,
        getUserCourseBookmarks,
        getUserBasket
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
        BookmarkProduct,
        BookmarkBlog,
        BookmarkCourse,
        AddCourseToBasket,
        AddProductToBasket,
        RemoveProductFromBasket,
        RemoveCourseFromBasket
    }
})

const graphqlSchema = new GraphQLSchema({
    query : RootQuery,
    mutation : RootMutation 
})

module.exports = {
    graphqlSchema
}