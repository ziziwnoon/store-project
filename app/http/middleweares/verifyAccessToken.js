const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECTERT_KEY } = require("../../utils/constants");
const { UserModel } = require("../../models/users");

function verifyAccesstoken(req,res,next){
    const headers = req.headers;
    const[bearer , token] = headers?.accesstoken?.split(" ") || [];
    if(token && ["Bearer", "bearer"].includes(bearer)){
        JWT.verify(token , ACCESS_TOKEN_SECTERT_KEY , async (error , payload)=>{
            if (error) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile});
            if(!user) return next(createError.Unauthorized(" حساب کاربری یافت نشد"))
            req.user = user;
            return next();
        })
    }
    else return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
}

module.exports = {
    verifyAccesstoken
}