const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECTERT_KEY, REFRESH_TOKEN_SECTERT_KEY } = require("./constants");
const createError = require("http-errors");
const redisClient = require("./../utils/init_redis");
const path = require("path");
const fs = require("fs")
const moment = require("moment-jalali")
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
    const nullishValues = ["", " ", "0", 0, null, undefined ]; 
    Object.entries(data).forEach(key => {
        if(blackListFields.includes(key)) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item=>item.trim())
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if(nullishValues.includes(data[key])) delete data[key];
    })
    //return data;
}


function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minute, second] = String(total).split(".");
    second = Math.round((second * 60) / 100).toString().substring(0, 2);
    let hour = 0;
    if (minute > 60) {
        total = minute / 60
         let [h1, m1] = String(total).split(".");
         hour = h1,
         minute = Math.round((m1 * 60) / 100).toString().substring(0, 2);
    }
    if(String(hour).length == 1) hour = `0${hour}`
    if(String(minute).length == 1) minute = `0${minute}`
    if(String(second).length == 1) second = `0${second}`
    return (hour + ":" + minute + ":" +second)
}

function getTotalTimeOfCourse(chapters = []){
    let time , hour , minute , second = 0;
    for (const chapter of chapters) { //loop on each chapter of a number of chapters
        if(Array.isArray(chapter?.episodes)){ //check if each chapter has an array of episodes
            for (const episode of chapter.episodes) { //loop on each episode of a chapters
                if(episode?.time) time = episode.time.split(":");
                else time = "00:00:00".split(":");
                if(time.length == 3){
                    second+= Number(time[0]) * 3600;
                    second+= Number(time[1]) * 60;
                    second+= Number(time[2]);
                }
                else if(time.length == 2){
                    second+= Number(time[0]) * 60;
                    second+= Number(time[1]);
                }
            }
        }
    }
    hour = Math.floor(second / 3600) //convert second to hour
    minute = Math.floor(second / 60) % 60 //convert second to minute
    second = Math.floor(second % 60) //convert second to second
    if(String(hour).length == 1) hour = `0${hour}`
    if(String(minute).length == 1) minute = `0${minute}`
    if(String(second).length == 1) second = `0${second}`
    return (hour + ":" + minute + ":" +second)
}

async function getBasketOfUser(userID){
    const userDetail = await UserModel.aggregate([
        {
            $match : { _id : userID }
        },
        {
            $project : {basket : 1}
        },
        {
            $lookup : {
                from : "products",
                localField : "basket.products.productID",
                foreignField : "_id",
                as : "productDetail"
            }
        },
        {
            $lookup : {
                from : "courses",
                localField : "basket.courses.courseID",
                foreignField : "_id",
                as : "courseDetail"
            }
        },
        {
            $addFields : {
                "productDetail" : {
                    $function : {
                        body : function(productDetail , products){
                            return productDetail.map(function(product){
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount : count ,
                                    totalPrice ,
                                    finalPrice : totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args : ["$productDetail" , "$basket.products"],
                        lang : "js"
                    }
                },
                "courseDetail" : {
                    $function : {
                        body : function(courseDetail){
                            return courseDetail.map(function(course){
                                return {
                                    ...course,
                                    finalPrice : course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args : ["$courseDetail"],
                        lang : "js"
                    }
                },
                "paymentDetail" : {
                    $function : {
                        body : function(courseDetail , productDetail , products){
                            const coursePayment = courseDetail.reduce(function(total , course){
                                return total + (course.price - ((course.discount / 100) * course.price))
                            }, 0)
                            const productPayment = productDetail.reduce(function(total , product){
                                const totalPrice = product.price * (products.find(item => item.productID.valueOf() == product._id.valueOf()).count)
                                return total + (totalPrice - ((product.discount / 100) * totalPrice))
                            }, 0)
                            const courseIDs = courseDetail.map(course => course._id.valueOf())
                            const productIDs = productDetail.map(product => product._id.valueOf())
                            return {
                                coursePayment ,
                                productPayment ,
                                totalPayment : coursePayment + productPayment ,
                                courseIDs ,
                                productIDs
                            }
                        },
                        args : ["$courseDetail" , "$productDetail" , "$basket.products"],
                        lang : "js"
                    }
                }
            }
        },
        {
            $project : {
                basket : 0
            }
        }
    ])

    return copyObject(userDetail)
}
//نصب moment-jalali لازم است
function invoiceNumberGenerator(){
    return moment().format("jYYYYjMMjDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9, 0)
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
    deleteInvalidPropertiesInObject,
    getTime,
    getTotalTimeOfCourse,
    getBasketOfUser,
    invoiceNumberGenerator
}