const { validateAsync } = require("@hapi/joi/lib/base");
const { addBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const createError = require("http-errors")

class AdminBlogController extends Controller{
    async createBlog(req,res,next){
        try {
            const result = await addBlogSchema.validateAsync(req.body);
            req.body.image = path.join(result.fileUploadPath , result.fileName);
            req.body.image = req.body.image.replace(/\\/g , "/");
            const {title , text , short_text , catrgory , tags } = result;
            const image = req.body.image;
            const author = req.user._id;

            const createBlogResult = await BlogModel.create({title , text , short_text , catrgory , tags , image , author})
            return res.json({
                createBlogResult
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error);
        }
       
    }

    async getListOfBlogs(req , res , next){
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match : {}
                },
                {
                    $lookup : {
                        from : "users",
                        foreignField : "_id" ,
                        localField : "author",
                        as : "author"
                    } 
                },
                
                {
                    $lookup : {
                        from : "categories",
                        foreignField : "_id" ,
                        localField : "category",
                        as : "category"
                    }
                },
                // {
                //     $unwind : "$category"
                // },
                // {
                //     $unwind : "$author"
                // },
                {
                    $project : {
                        "author.__v" : 0 ,
                        "author.otp" : 0 ,
                        "author.bills" : 0 ,
                        "author.role" : 0 ,
                        "author.discount" : 0 ,
                    }
                }
                
            ])
    
            return res.status(200).json({
                data : {
                    statusCode : 200,
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
        
    }

    async getBlogById(req,res,next){
        try {
            const {id} = req.params;
            const blog = await this.findBlog(id);
            return res.json({
                data : {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteBlogById(req,res,next){
        try {
            const {id} = req.params;
            await this.findBlog(id);
            const deletedBlog = await BlogModel.deleteOne({_id:id});
            if(deletedBlog.deletedCount == 0) throw createError.InternalServerError("حذف انجام نشد");
            return res.status(200).json({
                data : {
                    statusCode : 200 ,
                    message : "بلاگ با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateBlogById(req,res,next){
        try {
            const {id} = req.params;
            if(req?.body?.fileUploadPath && req?.body?.fileName){
                req.body.image = path.join(req.body.fileUploadPath , req.body.fileName);
                req.body.image = req.body.image.replace(/\\/g , "/");
            }
            
            const data = req.body;
            const blackListFields = ["author" , "comments" , "likes" , "dislikes" , "bookmark"];
            const nullishValues = ["" , " " , null , undefined , 0 , "0"]; 
            Object.entries(data).forEach(key => {
                if(blackListFields.includes(key)) delete data[key];
                if(nullishValues.includes(data[key])) delete data[key];
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item=>item.trim())
            })
            const updateBlogResult = await BlogModel.updateOne({_id : id} , {$set : data})
            if (updateBlogResult.modifiedCount ==0 ) throw createError.InternalServerError("بروزرسانی بلاگ انجام نشد")
            return res.json({
                data : {
                    statusCode : 200 ,
                    message : "بروزرسانی بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error);
        }
       
    }
    async findBlog(id){
            const blog = await BlogModel.findById(id).populate([{path : "category" , select : ['title']} , {path: "author" , select : ['first_name' , "last_name" , "mobile"] }]);
            if(!blog) throw createError.NotFound("بلاگ موردنظر یافت نشد")
            return blog;   
    }
}

module.exports = {
    AdminBlogController : new AdminBlogController()
}