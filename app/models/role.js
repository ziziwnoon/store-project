const { default: mongoose, model } = require("mongoose");

const roleSchema = new mongoose.Schema({
    title : {Type : String , unique : true},
    permissions : {Type : [mongoose.Types.ObjectId] , ref : 'permissions' , default : []}
} , {
    toJSON : {virtuals : true}
})

module.exports = {
    RoleModel : model("role" , roleSchema)
}