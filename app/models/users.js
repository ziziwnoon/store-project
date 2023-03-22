const {default : mongoose, model} = require("mongoose");
const ProductSchema = new mongoose.Schema({
    productID : { type : mongoose.Types.ObjectId , ref : "product"},
    count : { type : Number , default : 1}
})
const CourseSchema = new mongoose.Schema({
    courseID : { type : mongoose.Types.ObjectId , ref : "course"},
    count : { type : Number , default : 1}
})
const BasketSchema = new mongoose.Schema({
    course : { type : [CourseSchema], default : []},
    product : { type : [ProductSchema], default : []},
})
const UserSchema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String , lowercase : true},
    password : {type : String},
    email : {type : String, lowercase : true },
    mobile : {type : String, required : true },
    role : {type : String , default: "USER"},
    courses : {type : [mongoose.Types.ObjectId] , ref : "course" , default : []},
    bills : {type : [] , default:[]},
    discount : {type : Number , default : 0},
    birthday : {type:String},
    basket : {type : BasketSchema},
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

UserSchema.index({first_name : "text" , last_name : "text" , username : "text" , email : "text" , mobile : "text"})
module.exports = {
    UserModel : model("user" , UserSchema)
}