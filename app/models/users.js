const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String , lowercase : true},
    password : {type : String},
    email : {type : String, lowercase : true },
    mobile : {type : String, required : true },
    role : {type : [String] , default: ["USER"]},
    bills : {type : [] , default:[]},
    discount : {type : Number , default : 0},
    birthday : {type:String},
    otp : {type : Object , default : {
        code : 0,
        expiresin : 0
    }}
} , {
    timestamps : true ,
    toJSON : {
        virtuals : true
    }
})


module.exports = {
    UserModel : model("user" , Schema)
}