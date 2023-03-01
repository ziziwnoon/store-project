const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECTERT_KEY } = require("../../utils/constants");
const { UserModel } = require("../../models/users");

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
            const user = await UserModel.findOne({mobile});
            if(!user) throw createError.Unauthorized(" حساب کاربری یافت نشد")
            req.user = user;
            return next();
        })
    } catch (error) {
        next(error)
    }    
}



module.exports = {
    verifyAccesstoken,
    
} 



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAzNTM2OTI4MiIsImlhdCI6MTY3NzcwMzcwNCwiZXhwIjoxNzA5MjYxMzA0fQ.JMoVHkQjvXCwzgPJY8ucN_nNFGN2UmHIFmKnkuVJdsw
