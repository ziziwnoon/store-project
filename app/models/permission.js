const { default: mongoose, model } = require("mongoose");

const permissionSchema = new mongoose.Schema({
    title : {Type : String , unique : true},
    description : {Type : String ,  default : ""}
} , {
    toJSON : {virtuals : true}
})

module.exports = {
    PermissionModel : model("permission" , permissionSchema)
}