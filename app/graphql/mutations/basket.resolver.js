const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.type");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { checkExistingProduct, checkExistingCourse } = require("../utils");
const { UserModel } = require("../../models/users");
const { copyObject } = require("../../utils/functions");
const createHttpError = require("http-errors");

const AddProductToBasket = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {productID } = args;
        checkExistingProduct(productID)
        const product = await findProductInBasket(user._id , productID)
        if(product){
            await UserModel.updateOne({_id : user._id , "basket.products.productID" : productID} , {
                $inc : {
                    "basket.products.$.count" : 1
                }
            })
        } else {
            await UserModel.updateOne({_id : user._id} , {
                $push : {
                    "basket.products" : {
                        productID ,
                        count : 1
                    }
                }
            })
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message : "محصول با موفقیت به سبد خرید اضافه شد"
            }
        }
    }
}
const AddCourseToBasket = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {courseID} = args;
        await checkExistingCourse(courseID)
        const course = await findCourseInBasket(user._id , courseID)
        if(course){
            await UserModel.updateOne({_id : user._id , "basket.courses.courseID" : courseID} , {
                $inc : {
                    "basket.courses.$.count" : 1
                }
            })
        } else {
            await UserModel.updateOne({_id : user._id} , {
                $push : {
                    "basket.courses" : {
                        courseID ,
                        count : 1
                    }
                }
            })
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message : "دوره با موفقیت به سبد خرید اضافه شد"
            }
        }
    }
}
const RemoveProductFromBasket = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString},
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {productID } = args;
        checkExistingProduct(productID)
        const product = await findProductInBasket(user._id , productID)
        if(!product) throw createHttpError.NotFound("این محصول در سبد خرید شما وجود ندارد");
        let message;
        if(product.count > 1){
            await UserModel.updateOne({_id : user._id , "basket.products.productID" : productID } , {
                $inc : {
                    "basket.products.$.count" : -1
                }
            })
            message = "یک عدد از این محصول از سبد خرید شما حذف شد"
        } else {
            await UserModel.updateOne({_id : user._id , "basket.products.productID" : productID } , {
                $pull : {
                    "basket.products" : {
                        productID 
                    }
                }
            })
            message = "این محصول از سبد خرید شما حذف شد"
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}


const RemoveCourseFromBasket = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {courseID } = args;
        await checkExistingCourse(courseID)
        const course = await findCourseInBasket(user._id , courseID)
        if(!course) throw createHttpError.NotFound("این دوره در سبد خرید شما وجود ندارد");
        let message;
        if(course.count > 1){
            await UserModel.updateOne({_id : user._id , "basket.courses.courseID" : courseID} , {
                $inc : {
                    "basket.courses.$.count" : -1
                }
            })
            message = "یک عدد از این دوره از سبد خرید شما حذف شد"
        } else {
            await UserModel.updateOne({_id : user._id , "basket.courses.courseID" : courseID } , {
                $pull : {
                    "basket.courses" : {
                        courseID 
                    }
                }
            })
            message = "این دوره از سبد خرید شما حذف شد"
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}

async function findProductInBasket(userID , productID){
    const productInBasket = await UserModel.findOne({_id : userID , "basket.products.productID" : productID} ,{"basket.products.$": 1})
    const userDetail = copyObject(productInBasket)
    return userDetail?.basket?.products?.[0]
}


async function findCourseInBasket(userID , courseID){
    const courseInBasket = await UserModel.findOne({_id : userID , "basket.courses.courseID" : courseID} ,{"basket.courses.$": 1})
    const userDetail = copyObject(courseInBasket)
    return userDetail?.basket?.courses?.[0]
}


module.exports = {
    AddCourseToBasket,
    AddProductToBasket,
    RemoveProductFromBasket,
    RemoveCourseFromBasket
}