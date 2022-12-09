const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constants");

const addProductSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان وارد شده صحیح نیست")),
    text : Joi.string().error(new Error("توضیحات وارد شده صحیح نیست")),
    short_text : Joi.string().error(new Error("توضیحات کوتاه وارد شده صحیح نیست")),
    fileName : Joi.string().regex(/(\.png|\.jpg|\.jpeg|\.gif|\.webp)$/).error(new Error("تصویر وارد شده صحیح نیست")),
    tags : Joi.array().min(0).max(20).error(new Error("تگ وارد شده صحیح نیست")),
    category : Joi.string().regex(MongoIdPattern).error(new Error("دسته موردنظر یافت نشد")),
    fileUploadPath : Joi.allow(),
    count : Joi.number().allow(null , 0 , "0").error(new Error("تعداد وارد شده صحیح نیست")),
    price : Joi.number().allow(null , 0 , "0").error(new Error("قیمت وارد شده صحیح نیست")),
    discount : Joi.number().allow(null , 0 , "0").error(new Error("تخفیف وارد شده صحیح نیست")),
    type : Joi.string().regex(/(virtual|physical)/i),
    colors : Joi.array().min(0).max(20).error(new Error("رنگ های وارد شده نمیتواند بیشتر از 20 عدد باشد")),
    height : Joi.number().allow(null , 0 , "0").error(new Error("ارتفاع وارد شده صحیح نیست")),
    width : Joi.number().allow(null , 0 , "0").error(new Error("عرض وارد شده صحیح نیست")),
    weight : Joi.number().allow(null , 0 , "0").error(new Error("وزن وارد شده صحیح نیست")),
    length : Joi.number().allow(null , 0 , "0").error(new Error("طول وارد شده صحیح نیست")),
})



module.exports = {
    addProductSchema ,
}