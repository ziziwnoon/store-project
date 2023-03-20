const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLScalarType } = require("graphql")
const { toObject, parseLiteral } = require("../utils")

const AnyType = new GraphQLScalarType({
    name : "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral
})

const userType = new GraphQLObjectType({
    name : "userType" ,
    fields : {
        _id : {type : GraphQLString} ,
        first_name : {type : GraphQLString},
        last_name : {type : GraphQLString},
    }
})
const PublicCategoryType = new GraphQLObjectType({
    name : "PublicCategoryType" ,
    fields : {
        _id : {type : GraphQLString} ,
        title : {type : GraphQLString}
    }
})

const ResponseType = new GraphQLObjectType({
    name : "responseType",
    fields : {
        statusCode : {type : GraphQLString},
        data : {type : AnyType}
    }
})

module.exports = {
    userType,
    PublicCategoryType,
    AnyType,
    ResponseType
}