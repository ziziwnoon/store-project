const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const { addRoleSchema, updateRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidPropertiesInObject } = require("../../../../utils/functions");


class RoleController extends Controller{
    async getAllRoles(req, res, next){
        try {
            const roles = await RoleModel.find({})
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addRole(req, res, next){
        try {
            console.log(req.body.permissions);
            const {title , description ,permissions} = await addRoleSchema.validateAsync(req.body)
            await this.findRoleByTitle(title)
            const role = await RoleModel.create({title , description ,permissions })
            if(!role) throw createHttpError.InternalServerError("نقش موردنظر ایجاد نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "نقش موردنظر با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async removeRole(req, res, next){
        try {
            const {field} = req.params;
            const role = await this.findRoleByIdOrTitle(field)
            const deleteResult = await RoleModel.deleteOne({_id : role._id})
            if(!deleteResult.deletedCount) throw createHttpError.InternalServerError("نقش موردنظر حذف نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "نقش موردنظر با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateRoleById(req, res, next){
        try {
            const {id} = req.params;
            await this.findRoleByIdOrTitle(id);
            //await updateRoleSchema.validateAsync(req.body)
            const data = copyObject(req.body);
            deleteInvalidPropertiesInObject(data , [])
            const updateResult = await RoleModel.updateOne({_id : id} , {$set : data})
            if(!updateResult.modifiedCount) throw createHttpError.InternalServerError("نقش موردنظر ویرایش نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "نقش موردنظر با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findRoleByTitle(title){
        const role = await RoleModel.findOne({title})
        if(role) throw createHttpError.BadRequest("نقش وارد شده وجود دارد")
    }

    async findRoleByIdOrTitle(field){
        let findQuery = mongoose.isValidObjectId(field) ? {_id : field} : {title : field}
        const role = await RoleModel.findOne(findQuery)
        if(!role) throw createHttpError.NotFound("پارامتر وارد شده یافت نشد");
        return role
    }
}

module.exports = {
    RoleController : new RoleController()
}