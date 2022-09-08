const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constants");

const addCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست")),
    parent : Joi.string().allow('').pattern(MongoIdPattern).allow('').error(new Error("دسته مادر وارد شده صحیح نیست"))
})
const updateCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست"))
})


module.exports = {
    addCategorySchema ,
    updateCategorySchema
}