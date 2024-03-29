const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECTERT_KEY } = require("../../utils/constants");
const { UserModel } = require("../../models/users");
const createHttpError = require("http-errors");

function getToken(headers){
        const[bearer , token] = headers?.authorization?.split(" ") || [];
        if(token && ["Bearer", "bearer"].includes(bearer)) return token;
        throw createError.Forbidden("حساب کاربری شناسایی نشد وارد حساب خود شوید")
}
function verifyAccesstoken(req,res,next){
    try {
        const token = getToken(req.headers)
        JWT.verify(token , ACCESS_TOKEN_SECTERT_KEY , async (error , payload)=>{
            if (error) throw createError.Unauthorized("وارد حساب کاربری خود شوید")
            
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile} );
            if(!user) throw createError.Unauthorized(" حساب کاربری یافت نشد")
            req.user = user;
            return next();
        })
    } catch (error) {
        next(error)
    }    
}

//npm audit fix --force برای رفع آسیب دیدگی برای کارکردن فانکشن پایین
//گراف کیوال و جیسون وب توکن آپدیت باشه
async function verifyAccesstokenInGraphQL(req ){
    try {
        const token = getToken(req.headers)
        const {mobile} = JWT.verify(token , ACCESS_TOKEN_SECTERT_KEY )
        const user = await UserModel.findOne({mobile}, {password : 0 , otp: 0});
        if(!user) throw createError.Unauthorized(" حساب کاربری یافت نشد")
        return user
    } catch (error) {
        throw createHttpError.Unauthorized()
    }    
}



module.exports = {
    verifyAccesstoken,
    verifyAccesstokenInGraphQL
} 



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAzNTM2OTI4MiIsImlhdCI6MTY3OTQ1MDI4NCwiZXhwIjoxNzExMDA3ODg0fQ.T5O0Rq_6e84_7eiDQI35x3x2YXDf9wbfPJOAx6j7vds
