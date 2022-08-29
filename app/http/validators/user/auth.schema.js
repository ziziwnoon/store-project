const Joi = require("@hapi/joi");

const getOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره وارد شده صحیح نیست"))
})

const checkOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره وارد شده صحیح نیست")) , 
    code : Joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نمیباشد"))
})

module.exports = {
    getOtpSchema ,
    checkOtpSchema
}