const { PermissionModel } = require("../../../../models/permission");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const Controller = require("../../controller");
const { addPermissionSchema, updatePermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { copyObject, deleteInvalidPropertiesInObject } = require("../../../../utils/functions");

class PermissionController extends Controller{
    async getListOfPermissions(req, res, next){
        try {
            const permissions = await PermissionModel.find({});
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addPermission(req, res, next){
        try {
            const {title , description} = await addPermissionSchema.validateAsync(req.body)
            await this.findPermissionByTitle(title)
            const permission = await PermissionModel.create({title , description})
            if(!permission) throw createHttpError.InternalServerError("سطح دسترسی موردنظر ایجاد نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "سطح دسترسی موردنظر با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removePermissionById(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionById(id)
            const deleteResult = await PermissionModel.deleteOne({_id : id})
            if(!deleteResult) throw createHttpError.InternalServerError("حذف دسترسی با خطا مواجه شد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "سطح دسترسی موردنظر با موفقیت حذف شد"
                }
            })     
        } catch (error) {
            next(error)
        }
    }

    async updatePermissionById(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionById(id);
            //await updatePermissionSchema.validateAsync(req.body)
            const data = copyObject(req.body);
            deleteInvalidPropertiesInObject(data , [])
            const updateResult = await PermissionModel.updateOne({_id : id} , {$set : data})
            if(!updateResult.modifiedCount) throw createHttpError.InternalServerError("سطح دسترسی موردنظر ویرایش نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "سطح دسترسی موردنظر با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findPermissionByTitle(title){
        const permission = await PermissionModel.findOne({title})
        if(permission) throw createHttpError.BadRequest("سطح دسترسی وارد شده وجود دارد")
    }

    async findPermissionById(_id){
        const permission = await PermissionModel.findOne({_id})
        if(!permission) throw createHttpError.NotFound("سطح دسترسی وارد شده یافت نشد")
        return permission
    }
}

module.exports = {
    PermissionController : new PermissionController()
}