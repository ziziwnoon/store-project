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

function listOfImagesFromRequest(files , fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath , file.filename))).map(item => item.replace(/\\/g , "/"))
    }
    else {
        return []
    }
}

function copyObject(object){
    return JSON.parse(JSON.stringify(object))
}

function setFeatures(body){
    const {colors , width , weight , height , length} = body;
    let features = {};
    features.colors = colors;
    let type = "physical";
    if (!isNaN(+width) || !isNaN(+weight) || !isNaN(+height) || !isNaN(+length)){
        if(!width) features.width = 0;
        else features.width = +width;
        if(!weight) features.weight = 0;
        else features.weight = +weight;
        if(!height) features.height = 0;
        else features.height = +height;
        if(!length) features.length = 0;
        features.length = +length;
    }
    else {
        type = "virtual"
    }
    return features;
}

function deleteInvalidPropertiesInObject(data = {} , blackListFields = []){
    const nullishValues = ["" , " " , null , undefined , 0 , "0"]; 
    Object.entries(data).forEach(key => {
        if(blackListFields.includes(key)) delete data[key];
        if(nullishValues.includes(data[key])) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item=>item.trim())
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
    })
    return data;
}
module.exports = {
    randomNumberGenerator,
    signJwtToken,
    signRefreshJwtToken,
    verifyRefreshToken,
    deleteFileInPublic,
    listOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidPropertiesInObject
}