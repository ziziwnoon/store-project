const { CategoryModel } = require("../../../../models/categories");
const { addCategorySchema } = require("../../../validators/admin/category.schema");
const createError = require("http-errors");
const Controller = require("../../controller");
const statusCode = require("http-status-codes");
const mongoose = require("mongoose");
class CategoryController extends Controller{
    async addCategory(req,res,next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const{title,parent} = req.body;
            const category = await CategoryModel.create({title,parent});
            if(!category) throw createError.InternalServerError("خطای درونی سرور");
            return res.status(statusCode.OK).json({
                data : {
                    statusCode : statusCode.OK,
                    success : true ,
                    message : "دسته بندی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllParents(req,res,next){
        try {
            const parents = await CategoryModel.find({parent : undefined});
            if(!parents) throw createError.NotFound("دسته بندی یافت نشد");
            return res.status(statusCode.OK).json({
                data : {
                    parents
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getChildrenOfParent(req,res,next){
        try {
            const {parent} = req.params;
            const children = await CategoryModel.find({parent});
            if(!children) throw createError.NotFound("دسته بندی یافت نشد");
            return res.status(statusCode.OK).json({
                data : {
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllCategories(req,res,next){
        try {
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $lookup : {
            //             from : "categories",
            //             localField : "_id" ,
            //             foreignField : "parent" ,
            //             as : "children"
            //         }
            //     },
            //     {
            //         $project : {
            //             __v : 0,
            //             "children.__v" : 0,
            //             "children.parent"  : 0
            //         }
                
            //     }
            // ])

            // const categories = await CategoryModel.aggregate([
            //     {
            //         $graphLookup : {
            //             from : "categories" ,
            //             startWith : "$_id" ,
            //             connectFromField : "_id" ,
            //             connectToField : "parent",
            //             maxDepth : 5 ,
            //             depthField : "depth",
            //             as :"children"
            //         }
            //     },
            //     {
            //         $match : {
            //             parent : undefined
            //         }
            //     },
            //     {
            //         $project : {
            //                      __v : 0,
            //                      "children.__v" : 0,
            //                      "children.parent"  : 0
            //                  }
                        
            //              }
            // ])

            const categories = await CategoryModel.find({parent:undefined} , {__v : 0 , id:0})
            return res.status(statusCode.OK).json({
                data:{
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeCategory(req,res,next){
        const {id} = req.params;
        await this.checkExistingCategory(id);
        const deletedCategory = await CategoryModel.deleteMany({$or : [
            {_id : id},
            {parent : id}
        ]})
        if(deletedCategory.deletedCount == 0) throw createError.InternalServerError("دسته بندی حذف نشد");
        return res.status(statusCode.OK).json({
            data : {
                statusCode : statusCode.OK,
                message : "دسته بندی با موفقیت حذف شد"
            }
        })
    }

    async getCategoryById(req,res,next){
        try {
            const {id} = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(id)}
                },
                {
                    $lookup : {
                        from : "categories" ,
                        localField : "_id" ,
                        foreignField : "parent",
                        as : "children"
                    }
                }
            ])
            return res.status(statusCode.OK).json({
                data : {
                    statusCode : statusCode.OK ,
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllCategoriesWithoutPopulate(req,res,next){
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match : {}
                }
            ])
            return res.status(statusCode.OK).json({
                data : {
                    statusCode : statusCode.OK ,
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCategoryTitle(req,res,next){
        const {id} = req.params;
        const {title} = req.body;
        await this.checkExistingCategory(id);
        await updateCategorySchema.validateAsync(req.body)
        const updateResult = await CategoryModel.updateOne({_id : id}, {$set : {title}})
        if(updateResult.modifiedCount == 0) return createError.InternalServerError("ویرایش انجام نشد");
        return res.status(statusCode.OK).json({
            data : {
                statusCode : statusCode.OK ,
                message : "تغییر با موفقیت انجام شد"
            }
        })
    }

    async checkExistingCategory(id){
        try {
            const category = await CategoryModel.findById(id);
            if(!category) throw createError.NotFound("دسته بندی یافت نشد");
            return category;
        } catch (error) {
            next(error)
        }
        
        
    }
}

module.exports = {
    CategoryController : new CategoryController()
}







// docker run -d --name phpmyadmin1 --network asgard -e PMA_HOST=mysql1 -p 8080:80 phpmyadmin