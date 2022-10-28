const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECTERT_KEY, REFRESH_TOKEN_SECTERT_KEY } = require("./constants");
const createError = require("http-errors");
const redisClient = require("./../utils/init_redis");
const path = require("path");
const fs = require("fs")
function randomNumberGenerator(){
    return Math.floor((Math.random()*9000)+10000)
}

function signJwtToken(userId){
    return new Promise(async(resolve,reject)=>{
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile
        }
        const options = {
            expiresIn : "1y"
        }

        JWT.sign(payload , ACCESS_TOKEN_SECTERT_KEY , options , (err , token)=>{
            if (err) reject(createError.InternalServerError("خطای سرور"))
            resolve(token);
        })
    })
}

function signRefreshJwtToken(userId){
    return new Promise(async(resolve,reject)=>{
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile
        }
        const options = {
            expiresIn : "1y"
        }

        JWT.sign(payload , REFRESH_TOKEN_SECTERT_KEY , options , async(err , token)=>{
            if (err) reject(createError.InternalServerError("خطای سرور"));
            await redisClient.SETEX(userId , (365*24*60*60) , token);
            resolve(token);
        })
    })
}

function verifyRefreshToken(token){
    return new Promise((resolve,reject)=>{
        JWT.verify(token , REFRESH_TOKEN_SECTERT_KEY , async (error , payload)=>{
            if (error) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile});
            if(!user) reject(createError.Unauthorized(" حساب کاربری یافت نشد"));
            const refreshToken = await redisClient.get(user._id);
            if(token === refreshToken) return resolve(mobile)
            reject(createError.Unauthorized("مجددا وارد حساب خود شوید"))
        }
        )
    })
    
}

function deleteFileInPublic(fileAddress){
    if(fileAddress){
       const directory = path.join(__dirname , ".." , ".." , "public" , fileAddress)
       if(fs.existsSync(directory)) fs.unlinkSync(directory) 
    } 
}
module.exports = {
    randomNumberGenerator,
    signJwtToken,
    signRefreshJwtToken,
    verifyRefreshToken,
    deleteFileInPublic
}