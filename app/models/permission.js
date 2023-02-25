const { default: mongoose, model } = require("mongoose");

const permissionSchema = new mongoose.Schema({
    title : {type : String , unique : true},
    description : {type : String ,  default : ""}
} , {
    toJSON : {virtuals : true}
})

module.exports = {
    PermissionModel : mongoose.model("permission" , permissionSchema)
}