const { GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.type");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistingProduct, checkExistingCourse, checkExistingBlog } = require("../utils");

const LikeProduct = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {productID} = args;
        checkExistingProduct(productID)
        let likedProduct = await ProductModel.findOne({
            _id : productID,
            likes : user._id
        })
        let dislikedProduct = await ProductModel.findOne({
            _id : productID,
            dislikes : user._id
        })
        let updatedQuery = likedProduct ? {$pull : {likes : user._id}} : {$push : {likes : user._id}} 
        
        await ProductModel.updateOne({_id : productID}, updatedQuery)
        let message

        if(!likedProduct){
            if(dislikedProduct) await ProductModel.updateOne({_id : productID}, {
                $pull : {
                    dislikes : user._id
                }
            })
            message = "محصول باموفقیت لایک شد"
        } else message = "لایک محصول برداشته شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message 
            }
        }
    }
}
const LikeCourse = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {courseID} = args;
        await checkExistingCourse(courseID)
        let likedCourse = await CourseModel.findOne({
            _id : courseID,
            likes : user._id
        })
        let dislikedCourse = await CourseModel.findOne({
            _id : courseID,
            dislikes : user._id
        })
        let updatedQuery = likedCourse ? {$pull : {likes : user._id}} : {$push : {likes : user._id}} 
        
        await CourseModel.updateOne({_id : courseID}, updatedQuery)
        let message

        if(!likedCourse){
            if(dislikedCourse) await CourseModel.updateOne({_id : courseID}, {
                $pull : {
                    dislikes : user._id
                }
            })
            message = "دوره باموفقیت لایک شد"
        } else  message ="لایک دوره برداشته شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message 
            }
        }
    }
}
const LikeBlog = {
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
        let likedBlog = await BlogModel.findOne({
            _id : blogID,
            likes : user._id
        })
        let dislikedBlog = await BlogModel.findOne({
            _id : blogID,
            dislikes : user._id
        })
        let updatedQuery = likedBlog ? {$pull : {likes : user._id}} : {$push : {likes : user._id}} 

        await BlogModel.updateOne({_id : blogID}, updatedQuery)

        if(!likedBlog){
            if(dislikedBlog) await BlogModel.updateOne({_id : blogID}, {
                $pull : {
                    dislikes : user._id
                }
            })
            message = "بلاگ باموفقیت لایک شد"
        } else message = "لایک بلاگ برداشته شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}

module.exports = {
    LikeProduct,
    LikeCourse,
    LikeBlog
}