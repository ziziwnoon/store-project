const Joi = require("@hapi/joi");
const { MongoIdPattern } = require("../../../utils/constants");

const addRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).required().error(new Error("عنوان نقش وارد شده صحیح نیست")),
    permissions : Joi.allow()
})



module.exports = {
    addRoleSchema ,
}