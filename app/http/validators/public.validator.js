const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIdPattern } = require("../../utils/constants");

const ObjectIdValidator = Joi.object({
    id : Joi.string().pattern(MongoIdPattern).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})

module.exports = {
    ObjectIdValidator
}