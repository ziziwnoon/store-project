const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({
    invoiceNumber : {type : String},
    refID : {type : String , default : undefined},
    cardHash : {type : String},
    paymentDate : {type : Number},
    verify : {type : Boolean , default : false},
    description : {type : String , default : "بابت خرید دوره یا محصول"},
    authority : {type : String},
    amount : {type : Number},
    basket : {type : Object , default : {}},
    user : {type : mongoose.Types.ObjectId , ref : "user"},

} , {timestamps : true})


module.exports = {
    PaymentModel : model("payment" , Schema)
}