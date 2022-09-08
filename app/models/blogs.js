const {default : mongoose, model} = require("mongoose");
const CommentSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId , ref : "users" ,required : true},
    comment : {type : String , required : true},
    createdAt : {type : Date , default : new Date().now()},
    parent : {type : mongoose.Types.ObjectId }
})
const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , required : true},
    title : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : [mongoose.Types.ObjectId] , required : true},
    comments : {type : [CommentSchema] , default : []},
    likes : {type : mongoose.Types.ObjectId , ref : "users" , default : []},
    dislikes : {type : mongoose.Types.ObjectId , ref : "users" , default : []},
    bookmark : {type : mongoose.Types.ObjectId , ref : "users" , default : []}
}, {
    timestamps : true , versionKey : false
})


module.exports = {
    BlogModel : model("blog" , Schema)
}