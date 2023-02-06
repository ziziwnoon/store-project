const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constants");

const addCourseSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست")),
    text : Joi.string().error(new Error("توضیحات وارد شده صحیح نیست")),
    short_text : Joi.string().error(new Error("توضیحات کوتاه وارد شده صحیح نیست")),
    fileName : Joi.string().regex(/(\.png|\.jpg|\.jpeg|\.gif|\.webp)$/).error(new Error("تصویر وارد شده صحیح نیست")),
    tags : Joi.array().min(0).max(20).error(new Error("تگ وارد شده صحیح نیست")),
    category : Joi.string().regex(MongoIdPattern).error(new Error("دسته موردنظر یافت نشد")),
    fileUploadPath : Joi.allow(),
    price : Joi.number().allow(null , 0 , "0").error(new Error("قیمت وارد شده صحیح نیست")),
    discount : Joi.number().allow(null , 0 , "0").error(new Error("تخفیف وارد شده صحیح نیست")),
    type : Joi.string().regex(/(free|paid|VIP)/i),
})
const addEpisodeSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست")),
    text : Joi.string().error(new Error("توضیحات وارد شده صحیح نیست")),
    chapterID : Joi.string().regex(MongoIdPattern).error(new Error("شناسه فصل صحیح نمیباشد")),
    courseID : Joi.string().regex(MongoIdPattern).error(new Error("شناسه دوره صحیح نمیباشد")),
    type : Joi.string().regex(/(lock|unlock)/i),
    fileUploadPath : Joi.allow(),
    fileName : Joi.string().regex(/(\.mp4|\.mkv|\.mov|\.mpg|)$/).error(new Error("تصویر وارد شده صحیح نیست"))
})



module.exports = {
    addCourseSchema ,
    addEpisodeSchema
}