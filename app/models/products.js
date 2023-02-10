const {default : mongoose, model} = require("mongoose");
const { CommentSchema } = require("./public.schema");

const ProductSchema = new mongoose.Schema({
    title : {type : String , required : true},
    short_text : {type : String , required : true},
    text : {type : String , required : true},
    images : {type : [String] , required : true},
    tags : {type : [String] , default : []},
    category : {type : mongoose.Types.ObjectId , ref : "category"},
    comments : {type : [CommentSchema] , default : []},
    likes : {type : [mongoose.Types.ObjectId] , default : []},
    dislikes : {type : [mongoose.Types.ObjectId] , default : []},
    bookmark : {type : [mongoose.Types.ObjectId] , default : []},
    price : {type : Number},
    discount : {type : Number , default : 0},
    count : {type : Number , default : 0},
    type : {type : String},
    format : {type : String},
    supplier : {type : mongoose.Types.ObjectId , ref : "user"},
    features : {type : Object , default : {
        length : "",
        height : "",
        width : "",
        weight: "",
        color : [],
        model : [],
        madein : ""
    }}
} , {toJSON : {virtuals : true}})

ProductSchema.index({title : "text" , text : "text" , short_text : "text"})

ProductSchema.virtual("imagesURL").get(function(){
    return this.images.map(image => `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`)
})

module.exports = {
    ProductModel : model("product" , ProductSchema)
}