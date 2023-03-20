const { Kind } = require("graphql");
const createHttpError = require("http-errors");
const { BlogModel } = require("../models/blogs");
const { CourseModel } = require("../models/course");
const { ProductModel } = require("../models/products");

function toObject(value){
    if(typeof value === "object"){
        return value
    }
    if(typeof value === "string" && value.charAt(0)=="{"){
        return JSON.parse(value)
    }
    return null
}

function parseObject(valueNode){
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parsevalueNode(field.value)
    });
    return value
}

function parsevalueNode(valueNode){
    switch(valueNode.kind){
        case Kind.STRING:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parsevalueNode)
        default:
            return null
    }
}

function parseLiteral(valueNode){
    switch(valueNode.kind){
        case Kind.STRING:
            return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return toObject(valueNode.value)
    }
}

async function checkExistingBlog(id) {
    const blog = await BlogModel.findById(id)
    if(!blog) throw createHttpError.NotFound("بلاگی با مشخصات وارد شده یافت نشد")
    return blog
}
async function checkExistingCourse(id) {
    const course = await CourseModel.findById(id)
    if(!course) throw createHttpError.NotFound("دوره ای با مشخصات وارد شده یافت نشد")
    return course
}
async function checkExistingProduct(id) {
    const product = await ProductModel.findById(id)
    if(!product) throw createHttpError.NotFound("محصولی با مشخصات وارد شده یافت نشد")
    return product
}

module.exports = {
    toObject,
    parseObject,
    parsevalueNode,
    parseLiteral,
    checkExistingProduct,
    checkExistingCourse,
    checkExistingBlog
}