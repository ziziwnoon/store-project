const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constants");

const addRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان نقش وارد شده صحیح نیست")),
    permissions : Joi.array().items(Joi.string().pattern(MongoIdPattern)).error(new Error("دسترسی نقش وارد شده صحیح نیست"))
})
const addPermissionSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان سطح دسترسی وارد شده صحیح نیست")),
    description : Joi.string().min(0).max(100).error(new Error("توضیحات سطح دسترسی وارد شده صحیح نیست")),
})



module.exports = {
    addRoleSchema ,
    addPermissionSchema
}