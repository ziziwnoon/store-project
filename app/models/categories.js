const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String , required : true} ,
    parent : {type : mongoose.Types.ObjectId , ref: "category" ,default : undefined}
},{
    id : false ,
    __v : false ,
    toJSON : {
        virtuals :  true
    }
});

Schema.virtual("children" , {
    ref : "category",
    localField : "_id" ,
    foreignField : "parent"
})

function autoPopulate(next){
    this.populate([{path : "children" , select : {__v : 0 , id : 0}}])
    next()
}
Schema.pre("findOne", autoPopulate).
pre("find",autoPopulate)

module.exports = {
    CategoryModel : model("category" , Schema)
}