const { checkOtpSchema, getOtpSchema } = require("../../../validators/user/auth.schema")
const Controller = require("../../controller");
const createError = require("http-errors");
const { randomNumberGenerator, signJwtToken, verifyRefreshToken, signRefreshJwtToken } = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
class UserAuthController extends Controller {
    async getOtp(req,res,next){
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile,code);
            if(!result) createError.Unauthorized("ورود انجام نشد");
            return res.status(200).send(
                {data : {
                    statusCode : 200 ,
                    message : "با موفقیت وارد شدید",
                    code,
                    mobile
                }}
            )
        } catch (error) {
            next(createError.BadRequest(error.message))
        }
    }

    async checkOtp(req,res,next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {mobile , code} = req.body;
            const user = await UserModel.findOne({mobile})
            if(!user) throw(createError.NotFound("کاربر یافت نشد"))
            if(user.otp.code != code) throw createError.Unauthorized("کد صحیح نیست")
            const now = Date.now();
            if(user.otp.expiresin < now)  throw createError.Unauthorized("کد صحیح نیست")
            const accessToken = await signJwtToken(user._id);
            const refreshToken = await signRefreshJwtToken(user._id);
            return res.status(200).json({
                data : {
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
        
    }

    async signRefreshToken(req,res,next){
        try {
            const {refreshToken} = req.body;
            const mobile = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await signJwtToken(user._id)
            const newRefreshToken = await signRefreshJwtToken(user._id);
            return res.json({
                accessToken,
                refreshToken : newRefreshToken
            })
            
        } catch (error) {
            next(error)
        }
    }

    async saveUser(mobile,code){
        let otp = {
            code ,
            expiresin : (new Date().getTime()+120000)
        }
        const result = await this.checkExistingUser(mobile);
        if(result){
            return (await this.updateUser(mobile , {otp}))
        }
        return !!(await UserModel.create({
            mobile , otp , role : [USER_ROLE]
        }))
    }

    async checkExistingUser(mobile){
        const result = await UserModel.findOne({mobile})
        return !!result;
    }

    async updateUser(mobile , objectData={}){
        Object.entries(objectData).forEach(key=>{
            if([""," ",0,null,undefined].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile} , {$set : objectData})
        return !!updateResult.modifiedCount
    }

   
}

module.exports = {
    UserAuthController : new UserAuthController
}