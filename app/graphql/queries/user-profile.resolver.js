const { GraphQLList, GraphQLString } = require("graphql");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs");
const { ProductModel } = require("../../models/products");
const { CourseModel } = require("../../models/course");
const { BlogType } = require("../typeDefs/blog.type");
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type");
const { AnyType } = require("../typeDefs/public.type");
const { UserModel } = require("../../models/users");
const { getBasketOfUser } = require("../../utils/functions");

const getUserBlogBookmarks = {
    type : new GraphQLList(BlogType),
    resolve : async (_ , args , context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req)
        return await BlogModel.find({bookmark : user._id}).populate([{path :'author'} , 
        {path : 'category'} , 
        {path : 'comments.user'} , 
        {path : 'comments.answers.user'},
        {path : 'likes'} , 
        {path : 'dislikes'} , 
        {path : 'bookmark'} , ])
    }
}
const getUserProductBookmarks = {
    type : new GraphQLList(ProductType),
    resolve : async (_ , args , context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req)
        return await ProductModel.find({bookmark : user._id}).populate([{path :'supplier'} , 
        {path : 'category'} , 
        {path : 'comments.user'} , 
        {path : 'comments.answers.user'},
        {path : 'likes'} , 
        {path : 'dislikes'} , 
        {path : 'bookmark'} , ])
    }
}
const getUserCourseBookmarks = {
    type : new GraphQLList(CourseType),
    resolve : async (_ , args , context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req)
        return await CourseModel.find({bookmark : user._id}).populate([{path :'teacher'} , 
        {path : 'category'} , 
        {path : 'comments.user'} , 
        {path : 'comments.answers.user'},
        {path : 'likes'} , 
        {path : 'dislikes'} , 
        {path : 'bookmark'} , ])
    }
}

const getUserBasket = {
    type : AnyType,
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);

        const userDetail = getBasketOfUser(user._id)
        return userDetail
    }
}

module.exports = {
    getUserBlogBookmarks,
    getUserProductBookmarks,
    getUserCourseBookmarks,
    getUserBasket
}