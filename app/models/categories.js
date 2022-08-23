const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String , required : true}
})


module.exports = {
    CategoryModel : model("category" , Schema)
}