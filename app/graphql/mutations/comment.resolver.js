const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { BlogModel } = require("../../models/blogs");
const { CommentType } = require("../typeDefs/comment.type");
const { ResponseType } = require("../typeDefs/public.type");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { copyObject } = require("../../utils/functions");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../models/course");
const { ProductModel } = require("../../models/products");
const { checkExistingBlog, checkExistingCourse, checkExistingProduct } = require("../utils");

const CommentForBlog = {
    type : ResponseType,
    args : {
        comment : {type : GraphQLString},
        blogID : {type : GraphQLString},
        parent : {type : GraphQLString},
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {comment , blogID , parent} = args;
        let updatedComment
        if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadRequest("آیدی بلاگ موردنظر صحیح نیست");
        await checkExistingBlog(blogID)
        if(parent && mongoose.isValidObjectId(parent)){
            documentedComment = await getComment(BlogModel , parent)
            if(documentedComment && !documentedComment?.allowToComment) throw createHttpError.BadRequest("شما مجاز به پاسخ دادن به این کامنت نیستید");
            updatedComment = await BlogModel.updateOne(
                { "comments._id": parent },
                {
                  $push: {
                    "comments.$.answers": {
                        user : user._id , 
                        comment,
                        visiblity : false,
                        allowToComment : false,
                    },
                  },
                }
            );
            if(!updatedComment.modifiedCount) throw createHttpError.BadRequest("پاسخ شما ثبت نشد")
            return {
                statusCode : httpStatus.CREATED,
                data : {
                    message : "ثبت پاسخ با موفقیت انجام شد و نظر شما پس از تایید در سایت نمایش داده میشود"
                }
            }
        } else 
      {  updatedComment = await BlogModel.updateOne({_id : blogID} , {
            $push : {
                comments : {
                    user : user._id , 
                    comment,
                    visiblity : false,
                    allowToComment : true,
                }
            }
        })
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : "ثبت نظر با موفقیت انجام شد و نظر شما پس از تایید در سایت نمایش داده میشود"
            }
        }}

    }
}
const CommentForCourse = {
    type : ResponseType,
    args : {
        comment : {type : GraphQLString},
        courseID : {type : GraphQLString},
        parent : {type : GraphQLString},
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {comment , courseID , parent} = args;
        let updatedComment
        if(!mongoose.isValidObjectId(courseID)) throw createHttpError.BadRequest("آیدی دوره موردنظر صحیح نیست");
        await checkExistingCourse(courseID)
        if(parent && mongoose.isValidObjectId(parent)){
            documentedComment = await getComment(CourseModel , parent)
            if(documentedComment && !documentedComment?.allowToComment) throw createHttpError.BadRequest("شما مجاز به پاسخ دادن به این کامنت نیستید");
            updatedComment = await CourseModel.updateOne(
                { "comments._id": parent },
                {
                  $push: {
                    "comments.$.answers": {
                        user : user._id , 
                        comment,
                        visiblity : false,
                        allowToComment : false,
                    },
                  },
                }
            );
            if(!updatedComment.modifiedCount) throw createHttpError.BadRequest("پاسخ شما ثبت نشد")
            return {
                statusCode : httpStatus.CREATED,
                data : {
                    message : "ثبت پاسخ با موفقیت انجام شد و نظر شما پس از تایید در سایت نمایش داده میشود"
                }
            }
        } else 
      {  updatedComment = await CourseModel.updateOne({_id : courseID} , {
            $push : {
                comments : {
                    user : user._id , 
                    comment,
                    visiblity : false,
                    allowToComment : true,
                }
            }
        })
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : "ثبت نظر با موفقیت انجام شد و نظر شما پس از تایید در سایت نمایش داده میشود"
            }
        }}

    }
}
const CommentForProduct = {
    type : ResponseType,
    args : {
        comment : {type : GraphQLString},
        productID : {type : GraphQLString},
        parent : {type : GraphQLString},
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {comment , productID , parent} = args;
        let updatedComment
        if(!mongoose.isValidObjectId(productID)) throw createHttpError.BadRequest("آیدی محصول موردنظر صحیح نیست");
        await checkExistingProduct(productID)
        if(parent && mongoose.isValidObjectId(parent)){
            documentedComment = await getComment(ProductModel , parent)
            if(documentedComment && !documentedComment?.allowToComment) throw createHttpError.BadRequest("شما مجاز به پاسخ دادن به این کامنت نیستید");
            updatedComment = await ProductModel.updateOne(
                { "comments._id": parent },
                {
                  $push: {
                    "comments.$.answers": {
                        user : user._id , 
                        comment,
                        visiblity : false,
                        allowToComment : false,
                    },
                  },
                }
            );
            if(!updatedComment.modifiedCount) throw createHttpError.BadRequest("پاسخ شما ثبت نشد")
            return {
                statusCode : httpStatus.CREATED,
                data : {
                    message : "ثبت پاسخ با موفقیت انجام شد و نظر شما پس از تایید در سایت نمایش داده میشود"
                }
            }
        } else 
      {  updatedComment = await ProductModel.updateOne({_id : productID} , {
            $push : {
                comments : {
                    user : user._id , 
                    comment,
                    visiblity : false,
                    allowToComment : true,
                }
            }
        })
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : "ثبت نظر با موفقیت انجام شد و نظر شما پس از تایید در سایت نمایش داده میشود"
            }
        }}

    }
}

async function getComment(model , id){
    const foundComment = await model.findOne({"comments._id" : id} , {"comments.$" : 1})
    const comment = copyObject(foundComment);
    if(!comment?.comments?.[0]) throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد")
    return comment?.comments?.[0]
}

module.exports = {
    CommentForBlog,
    CommentForProduct,
    CommentForCourse
}