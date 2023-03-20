const { GraphQLList, GraphQLString } = require("graphql");
const { verifyAccesstokenInGraphQL } = require("../../http/middleweares/verifyAccessToken");
const { ProductModel } = require("../../models/products")
const { ProductType } = require("../typeDefs/product.type")

const ProductResolver = {
    type : new GraphQLList(ProductType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async (_, args) => {
        const {category} = args;
        const findQuery = category ? {category} : {}
        console.log(findQuery);
        return await ProductModel.find(findQuery).populate([{path :'supplier'} ,
        {path : 'category'},
        {path : 'comments.user'} , 
        {path : 'comments.answers.user'}])
    }
}

module.exports = {
    ProductResolver
}