const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constants");

const addBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست")),
    text : Joi.string().error(new Error("توضیحات وارد شده صحیح نیست")),
    short_text : Joi.string().error(new Error("توضیحات کوتاه وارد شده صحیح نیست")),
    fileName : Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.gif|\.webp)$/).error(new Error("تصویر وارد شده صحیح نیست")),
    tags : Joi.array().min(0).max(20).error(new Error("تگ وارد شده صحیح نیست")),
    category : Joi.string().pattern(MongoIdPattern).error(new Error("دسته موردنظر یافت نشد")),
    fileUploadPath : Joi.allow()
})
const updateBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست"))
})


module.exports = {
    addBlogSchema ,
    updateBlogSchema
}