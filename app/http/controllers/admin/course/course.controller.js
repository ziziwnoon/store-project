const Controller = require("../../controller");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const path = require("path");
const { deleteFileInPublic, copyObject, deleteInvalidPropertiesInObject, getTotalTimeOfCourse } = require("../../../../utils/functions");
const { addCourseSchema } = require("../../../validators/admin/course.schema");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
class CourseController extends Controller{
    async getAllCourses(req,res,next){
        try {
            const search = req?.query?.search || "";
            let courses;
            if(search) courses = await CourseModel.find({$text : {$search : search}})
            .populate([
                {path : "category" , select:{title : 1 , children : 0}},
                {path : "teacher" , select : {first_name : 1 , last_name : 1 ,email : 1 , mobile : 1}}
            ])
            .sort({_id : -1})
            else courses = await CourseModel.find({})
            .populate([
                {path : "category" , select:{title : 1}},
                {path : "teacher" , select : {first_name : 1 , last_name : 1 ,email : 1 , mobile : 1}}
            ])
            .sort({_id : -1})
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

    async editCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await this.findCourseById(id);
            const {fileUploadPath , fileName} = req.body;
            const data = copyObject(req.body);
            const blackListFields = ["time" , "students" , "comments" , "likes" , "dislikes" , "episodes" , "chapters" , "fileUploadPath" , "fileName"];
            deleteInvalidPropertiesInObject(data , blackListFields);
            if(req.file){
                data.image = path.join(fileUploadPath , fileName).replace(/\\/g , "/");
                deleteFileInPublic(course.image)
            }
            const updatedCourse = await CourseModel.updateOne({_id : id} , {$set : data});
            
            if(!updatedCourse) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "بروزرسانی با موفقیت انجام شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async getCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            course.time = getTotalTimeOfCourse(course.chapters)
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

    async addChapter(req, res, next){
        try {
            const {id , title , text} = req.body;
            await this.findCourseById(id);
            const addChapterResult = await CourseModel.updateOne({_id : id} , {$push : {
                chapters : {title , text , episodes : []}
            }})
            if (addChapterResult.modifiedCount == 0) throw createHttpError.BadRequest("فصل جدید اضافه نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED ,
                data : {
                    message : "فصل جدید با موفقیت اضافه شد" 
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی وارد شده صحیح نمیباشد");
        const course = await CourseModel.findById(id)
        if(!course) throw createHttpError.NotFound("دوره یافت نشد");
        return course;
    }
}

module.exports = {
    CourseController : new CourseController()
}