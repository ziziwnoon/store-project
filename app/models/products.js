const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String , required : true},
    short_desc : {type : String , required : true},
    total_desc : {type : String , required : true},
    images : {type : [String] , required : true},
    tags : {type : [String] , default : []},
    category : {type : mongoose.Types.ObjectId },
    comments : {type : [] , default : []},
    likes : {type : mongoose.Types.ObjectId , default : []},
    dislikes : {type : mongoose.Types.ObjectId , default : []},
    bookmark : {type : mongoose.Types.ObjectId , default : []},
    price : {type : Number},
    discount : {type : Number , default : 0},
    count : {type : Number , default : 0},
    type : {type : String},
    time : {type : String},
    format : {type : String},
    teacher : {type : mongoose.Types.ObjectId},
    feature : {type : Object , default : {
        length : "",
        height : "",
        width : "",
        weight: "",
        color : [],
        model : [],
        madein : ""
    }}
})


module.exports = {
    ProductModel : model("product" , Schema)
}