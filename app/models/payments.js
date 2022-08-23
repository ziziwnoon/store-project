const {default : mongoose, model} = require("mongoose");

const Schema = new mongoose.Schema({

})


module.exports = {
    PaymentModel : model("payment" , Schema)
}