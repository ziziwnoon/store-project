const { GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.type");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistingProduct, checkExistingCourse, checkExistingBlog } = require("../utils");

const DislikeProduct = {
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
        let updatedQuery = dislikedProduct ? {$pull : {dislikes : user._id}} : {$push : {dislikes : user._id}} 
        
        await ProductModel.updateOne({_id : productID}, updatedQuery)
        let message

        if(!dislikedProduct){
            if(likedProduct) await ProductModel.updateOne({_id : productID}, {
                $pull : {
                    likes : user._id
                }
            })
            message = "محصول باموفقیت دیس لایک شد"
        } else message = "دیس لایک محصول برداشته شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message 
            }
        }
    }
}
const DislikeCourse = {
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
        let updatedQuery = dislikedCourse ? {$pull : {dislikes : user._id}} : {$push : {dislikes : user._id}} 
        
        await CourseModel.updateOne({_id : courseID}, updatedQuery)
        let message

        if(!dislikedCourse){
            if(likedCourse) await CourseModel.updateOne({_id : courseID}, {
                $pull : {
                    likes : user._id
                }
            })
            message = "دوره باموفقیت دیس لایک شد"
        } else  message ="دیس لایک دوره برداشته شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message 
            }
        }
    }
}
const DislikeBlog = {
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
        let updatedQuery = dislikedBlog ? {$pull : {dislikes : user._id}} : {$push : {dislikes : user._id}} 

        await BlogModel.updateOne({_id : blogID}, updatedQuery)

        if(!dislikedBlog){
            if(likedBlog) await BlogModel.updateOne({_id : blogID}, {
                $pull : {
                    likes : user._id
                }
            })
            message = "بلاگ باموفقیت دیس لایک شد"
        } else message = "دیس لایک بلاگ برداشته شد"

        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}

module.exports = {
    DislikeProduct,
    DislikeCourse,
    DislikeBlog
}