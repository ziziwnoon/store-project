const { GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.type");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistingProduct, checkExistingCourse, checkExistingBlog } = require("../utils");

const BookmarkProduct = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {productID} = args;
        checkExistingProduct(productID)
        let bookmarkProduct = await ProductModel.findOne({
            _id : productID,
            bookmark : user._id
        })
        let updatedQuery = bookmarkProduct ? {$pull : {bookmark : user._id}} : {$push : {bookmark : user._id}} 
        
        await ProductModel.updateOne({_id : productID}, updatedQuery)
        let message

        if(!bookmarkProduct){
            message = "محصول باموفقیت به لیست ذخیره اضافه شد"
        } else message = " محصول از لیست ذخیره حذف شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message 
            }
        }
    }
}
const BookmarkCourse = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {courseID} = args;
        await checkExistingCourse(courseID)
        let bookmarkCourse = await CourseModel.findOne({
            _id : courseID,
            bookmark : user._id
        })
        let updatedQuery = bookmarkCourse ? {$pull : {bookmark : user._id}} : {$push : {bookmark : user._id}} 
        
        await CourseModel.updateOne({_id : courseID}, updatedQuery)
        let message

        if(!bookmarkCourse){
            message = "دوره باموفقیت به لیست ذخیره اضافه شد"
        } else  message =" دوره از لیست ذخیره حذف شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message 
            }
        }
    }
}
const BookmarkBlog = {
    type : ResponseType,
    args : {
        blogID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        let message
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {blogID} = args;
        await checkExistingBlog(blogID)
        let bookmarkBlog = await BlogModel.findOne({
            _id : blogID,
            bookmark : user._id
        })
        let updatedQuery = bookmarkBlog ? {$pull : {bookmark : user._id}} : {$push : {bookmark : user._id}} 

        await BlogModel.updateOne({_id : blogID}, updatedQuery)

        if(!bookmarkBlog){
            message = "بلاگ باموفقیت به لیست ذخیره اضافه شد"
        } else message = " بلاگ از لیست ذخیره حذف شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}

module.exports = {
    BookmarkProduct,
    BookmarkCourse,
    BookmarkBlog
}