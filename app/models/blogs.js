const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , required : true},
    title : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : mongoose.Types.ObjectId , required : true},
    comments : {type : [] , default : []},
    likes : {type : mongoose.Types.ObjectId , default : []},
    dislikes : {type : mongoose.Types.ObjectId , default : []},
    bookmark : {type : mongoose.Types.ObjectId , default : []}
})


module.exports = {
    BlogModel : model("blog" , Schema)
}