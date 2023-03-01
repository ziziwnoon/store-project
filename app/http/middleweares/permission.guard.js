const createHttpError = require("http-errors");
const { PermissionModel } = require("../../models/permission");
const { RoleModel } = require("../../models/role");
const { PERMISSION } = require("../../utils/constants");

function checkRole(requiredPermissions = []){
    return async function(req,res,next){
        try {
            const user = req.user;
            requiredPermissions = requiredPermissions.flat(2) //قرار دادن آرایه های تو در تو در یک سطح
            const role = await RoleModel.findOne({title : user.role})
            const permissions = await PermissionModel.find({_id : {$in : role.permissions}})
            const userPermissions = permissions.map(item => item.title);
            const hasPermissions = requiredPermissions.every(permission => {
                return userPermissions.includes(permission)
            })
            if(userPermissions.includes(PERMISSION.ALL)) return next()
            if(requiredPermissions.length == 0 || hasPermissions) return next()
            throw createHttpError.Forbidden("شما به این سطح دسترسی ندارید")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    checkRole
}