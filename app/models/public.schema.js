const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId , ref : "users" ,required : true},
    comment : {type : String , required : true},
    visiblity : {type : Boolean , required : true , default : false},
    allowToComment : {type : Boolean , default : true},
    parent : {type : mongoose.Types.ObjectId , ref : "comment"}
}, {
    timestamps : {createdAt : true}
})

module.exports = {
    CommentSchema
}