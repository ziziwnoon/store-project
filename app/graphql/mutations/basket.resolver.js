const { GraphQLString, GraphQLInt } = require("graphql");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.type");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { CourseModel } = require("../../models/course");
const { checkExistingProduct, checkExistingCourse } = require("../utils");

const AddProductToBasket = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString},
        count : {type : GraphQLInt}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {productID , count} = args;
        checkExistingProduct(productID)
    }
}
const AddCourseToBasket = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString},
        count : {type : GraphQLInt}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccesstokenInGraphQL(req);
        const {courseID , count} = args;
        await checkExistingCourse(courseID)
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
    }
}


module.exports = {
    AddCourseToBasket,
    AddProductToBasket,
    RemoveProductFromBasket,
    RemoveCourseFromBasket
}