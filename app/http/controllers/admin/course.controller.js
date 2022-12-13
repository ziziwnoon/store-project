const Controller = require("../controller");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { CourseModel } = require("../../../models/course");
const path = require("path");
const { deleteFileInPublic } = require("../../../utils/functions");
const { addCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");
class CourseController extends Controller{
    async getAllCourses(req,res,next){
        try {
            const search = req?.query?.search || "";
            let courses;
            if(search) courses = await CourseModel.find({$text : {$search : search}}).sort({_id : -1})
            else courses = await CourseModel.find({}).sort({_id : -1})
            return res.status(HttpStatus.OK).json({
                data : {
                    statusCode : HttpStatus.OK ,
                    courses
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async addCourse(req,res,next){
        try {
            await addCourseSchema.validateAsync(req.body);
            const teacher = req.user._id;
            const {fileUploadPath , fileName} = req.body;
            const image = path.join(fileUploadPath , fileName).replace(/\\/g , "/");
            const {title , text, short_text , tags , category , type , price , discount} = req.body;
            if((Number(discount > 0)) && (Number(price > 0)) && (type === "free")) throw createHttpError.BadRequest("دوره رایگان نمیتواند قیمت و تخفیف داشته باشد")
            const createdCourse = await CourseModel.create(
                {title , 
                text, 
                short_text , 
                tags , 
                category , 
                type , 
                price , 
                discount , 
                image ,
                time : "00:00:00" ,
                teacher})
            if(!createdCourse?._id) throw createHttpError.InternalServerError("دوره موردنظر اضافه نشد")
            return res.status(HttpStatus.CREATED).json({
                data : {
                    status : HttpStatus.CREATED ,
                    message : "دوره موردنظر باموفقیت اضافه شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async getCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            if(!course) throw createHttpError.NotFound("دوره یافت نشد");
            return res.status(HttpStatus.OK).json({
                data : {
                    statusCode : HttpStatus.OK ,
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}